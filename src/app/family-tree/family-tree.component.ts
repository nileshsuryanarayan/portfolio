import { Component, OnInit, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import { Tree, Node } from './family-tree.model';
import { Arjun, Waman } from './family.data';
import { FamilyTreeService } from './family-tree.service';
import { UtilityService } from '../common/services/utility.service';
import { Gender } from './family-node.model';

@Component({
  selector: 'app-family-tree',
  templateUrl: './family-tree.component.html',
  styleUrls: ['./family-tree.component.scss', './family-tree.component.mobile.scss']

})
export class FamilyTreeComponent implements OnInit {
  private svg: any;
  private margin = { top: 20, right: 90, bottom: 30, left: 90 };
  private width = 2000 - this.margin.left - this.margin.right;
  private height = 2800 - this.margin.top - this.margin.bottom;
  private treeData: Tree;
  private g: any;

  pageTitle = 'Suryanarayan Family Tree';

  private BUFFER_SIZE: number = 100;

  popupVisible = false;
  popupStyle = {};
  selectedNode = null;
  popupNode: Node;
  popupFatherName: string;
  popupMotherName: string;
  popupDateOfBirth: string;
  popupDateOfDeath: string;
  popupDateOfDeathValid: boolean = false;
  popupEditMode = false;
  familyMap: Map<number, Node>;

  // Update node related temp variables
  fatherId: string;
  dateOfBirth: string;
  dateOfDeath: string;

  males: Node[];
  females: Node[];

  additionalChildren: Node[] = [];
  addedSpouse: Node;

  // Temp Spouse details for adding new spouse
  showSpouse = false;
  showSpouseForm = false;
  showAddSpouseBtn = true; // Controls visibility of the "Add Spouse" button
  spouseFirstName: string;
  spouseLastName: string;
  spouseDateOfBirth: string;
  spouseDateOfDeath: string;
  spouseGender: string;
  spouseNode: Node;

  // Temp children details for adding new children
  showAddChildrenBtn = true; // Controls visibility of the "Add Children" button
  showChildrenForm = false;
  tempChildren: Node[] = [];

  constructor(
    private el: ElementRef,
    private familyService: FamilyTreeService,
    private util: UtilityService
  ) {}

  ngOnInit(): void {
    this.dataInit();
  }

  dataInit() {
    this.familyService.getFamilyData().subscribe(
      (data) => {
        // Do something with data
        this.handleFamilyData(data);
      },
      (error) => {
        // Handle error and display proper message on UI
        console.error('ERROR retrieving family data:', error);
      }
    );
  }

  /**
   * Creates the SVG element and sets up the zoom behavior.
   */
  handleFamilyData(data: Node[]) {
    let tree: Tree = this.familyService.restructure(data)?.tree;
    this.familyMap = this.familyService.restructure(data)?.map;
    this.males = this.familyService.filterMales(data);
    this.females = this.familyService.filterFemales(data);
    console.log('Restructured Data ======: ', tree);
    console.log('MALES ======: ', this.males);

    // Static data
    this.treeData = tree;
    this.createSvg();
    this.drawTree();
  }

  private createSvg(): void {
    this.svg = d3
      .select(this.el.nativeElement)
      .select('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .call(
        d3.zoom().on('zoom', (event: any) => {
          this.g.attr('transform', event.transform);
        })
      );

    this.g = this.svg
      .append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);
  }

  private drawTree(): void {
    // Clear previous contents
    this.svg.selectAll('*').remove();

    // Define zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 3])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    // Append a group for zoomable content
    const g = this.svg.append('g').attr('class', 'zoomable-group');
    this.svg.call(zoom);

    // Create hierarchy and layout
    const root = d3.hierarchy(this.treeData.rootNode, (d) => d.children);
    const treeLayout = d3
      .tree()
      .size([this.height, this.width - this.margin.left - this.margin.right]);
    treeLayout(root);

    // Calculate dimensions
    const maxX = d3.max(root.descendants(), (d) => d.y)!;
    const maxY = d3.max(root.descendants(), (d) => d.x)!;
    const newWidth = maxX + this.margin.left + this.margin.right + this.BUFFER_SIZE;
    const newHeight = maxY + this.margin.top + this.margin.bottom + this.BUFFER_SIZE;

    this.svg
      .attr('width', newWidth)
      .attr('height', newHeight)
      .attr('viewBox', `0 0 ${newWidth} ${newHeight}`);

    // Gradients
    const defs = g.append('defs');

    const addGradient = (id: string, stops: [string, string][]) => {
      const grad = defs.append('linearGradient').attr('id', id)
        .attr('x1', '0%').attr('x2', '100%')
        .attr('y1', '0%').attr('y2', '100%');
      stops.forEach(([offset, color]) => {
        grad.append('stop').attr('offset', offset).attr('stop-color', color);
      });
    };

    addGradient('tree-gradient', [['0%', '#6b3f2b'], ['100%', '#d6b38b']]);
    addGradient('electric-blue-gradient', [['0%', '#00d9ff'], ['50%', '#0077ff'], ['100%', '#00ffcc']]);
    addGradient('male-gradient', [['0%', '#77A1D3'], ['71%', '#79CBCA'], ['100%', '#77A1D3']]);
    addGradient('female-gradient', [['0%', '#ff6e7f'], ['71%', '#FFB6C1'], ['100%', '#ff6e7f']]);

    // Links
    const linkPath = g
      .selectAll('.link')
      .data(root.links())
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('d', (d: any) => {
        const curvature = 0.5;
        const sourceX = d.source.y + 100;
        const sourceY = d.source.x + 15;
        const targetX = d.target.y;
        const targetY = d.target.x + 15;
        return `M${sourceX},${sourceY}C${sourceX + curvature * (targetX - sourceX)
          },${sourceY + 30} ${targetX - curvature * (targetX - sourceX)},${targetY - 30
          } ${targetX},${targetY}`;
      })
      .style('fill', 'none')
      .style('stroke', 'url(#electric-blue-gradient)')
      .style('stroke-width', (d: any) => {
        const parentDepth = d.source.depth;
        const maxDepth = d3.max(root.descendants(), (node: any) => node.depth)!;
        return Math.max(1, 5 - (parentDepth / maxDepth) * 4);
      })
      .style('stroke-dasharray', function (this: SVGPathElement) {
        return this.getTotalLength();
      })
      .style('stroke-dashoffset', function (this: SVGPathElement) {
        return this.getTotalLength();
      });

    // Animate links
    linkPath
      .transition()
      .duration(2000)
      .ease(d3.easeLinear)
      .style('stroke-dashoffset', 0);

    // Nodes
    const nodes = g
      .selectAll('.node')
      .data(root.descendants())
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', (d: any) => `translate(${d.y},${d.x})`);

    nodes
      .append('rect')
      .attr('width', 100)
      .attr('height', 30)
      .attr('fill', (d: any) => (d.data.gender === 'MALE' ? 'url(#male-gradient)' : 'url(#female-gradient)'))
      .attr('rx', 2)
      .attr('ry', 2)
      .attr('id', (d: any) => `${d.data.firstName}-${d.data.lastName}`);

    // Leaf shapes (optional visual touch)
    nodes.append('path')
      .attr('d', 'M 0,0 Q 10,10 20,0 Q 10,-10 0,0 Z')
      .attr('fill', 'green')
      .attr('transform', (d: any) => `translate(${d.y - 60},${d.x - 30}) rotate(-30)`)
      .style('opacity', 0.7);

    nodes.append('path')
      .attr('d', 'M 0,0 Q 10,10 20,0 Q 10,-10 0,0 Z')
      .attr('fill', 'green')
      .attr('transform', (d: any) => `translate(${d.y + 60},${d.x - 30}) rotate(30)`)
      .style('opacity', 0.7);

    nodes.append('text')
      .attr('dy', 20)
      .attr('x', 50)
      .style('text-anchor', 'middle')
      .text((d: any) => d.data.firstName)
      .on('click', (event, d) => this.showDetails(d.data, d.x, d.y));

    // Spouse rendering
    root.descendants().forEach((d) => {
      if (d.data.spouse) {
        const spouses = d.data.spouse;
        let d1y1 = d.y;
        let d1x1 = d.x;

        spouses.forEach((spouse, index) => {
          const spouseNode = {
            ...spouse,
            x: d1x1 + 40,
            y: d1y1,
          };

          const spouseGroup = g
            .append('g')
            .attr('class', 'node')
            .attr('id', `${d.data.firstName}`)
            .attr('transform', `translate(${spouseNode.y},${spouseNode.x})`);

          spouseGroup.append('rect')
            .attr('width', 100)
            .attr('height', 30)
            .attr('fill', spouseNode.gender === 'MALE' ? 'url(#male-gradient)' : 'url(#female-gradient)')
            .attr('rx', 2)
            .attr('ry', 2)
            .attr('id', `${spouseNode.firstName}-${spouseNode.lastName}`);

          spouseGroup.append('text')
            .attr('dy', 20)
            .attr('x', 50)
            .style('text-anchor', 'middle')
            .text(spouseNode.firstName)
            .on('click', () => this.showDetails(spouseNode, spouseNode.x, spouseNode.y));

          // Spouse lines
          g.append('line')
            .attr('class', 'link')
            .attr('x1', d1y1 + 70)
            .attr('y1', d1x1 + 30)
            .attr('x2', spouseNode.y + 70)
            .attr('y2', spouseNode.x)
            .style('stroke', 'black');

          g.append('line')
            .attr('class', 'link')
            .attr('x1', d1y1 + 30)
            .attr('y1', d1x1 + 30)
            .attr('x2', spouseNode.y + 30)
            .attr('y2', spouseNode.x)
            .style('stroke', 'black');

          d1y1 = spouseNode.y;
          d1x1 = spouseNode.x;
        });
      }
    });
  }

  showDetails(data: Node, x: number, y: number): void {
    this.resetPopupValues();
    this.popupVisible = true;
    this.popupNode = data;

    this.dateOfBirth = data.dateOfBirth.toString();
    this.dateOfDeath = data.dateOfDeath?.toString();

    this.popupFatherName = this.util.isStringEmpty(
      this.familyMap.get(+data.fatherId)?.firstName
    )
      ? 'No data available'
      : this.familyMap.get(+data.fatherId).firstName +
        ' ' +
        this.familyMap.get(+data.fatherId).lastName;

    this.popupMotherName = this.util.isStringEmpty(
      this.familyMap.get(+data.motherId)?.firstName
    )
      ? 'No data available'
      : this.familyMap.get(+data.motherId).firstName +
        ' ' +
        this.familyMap.get(+data.motherId).lastName;

    this.popupDateOfDeathValid = this.util.isDateValid(data.dateOfDeath);

    // Show spouse
    if(data.spouse && data.spouse.length > 0) {
      this.showSpouse = true;
    }
  }

  resetPopupValues(): void {
    this.popupNode = null;
    this.popupFatherName = '';
    this.popupMotherName = '';
    this.popupDateOfBirth = '';
    this.popupDateOfDeath = '';
    this.clearSpouseDeails();
    this.clearChildren();
  }

  hideDetails(): void {
    this.popupVisible = false;
    this.popupEditMode = false;
    this.showSpouseForm = false;
    this.showChildrenForm = false;
    this.resetPopupValues();
  }

  switchToEditMode() {
    this.popupEditMode = true;
    this.popupDateOfDeathValid = true;
    this.showAddSpouseBtn = !this.popupNode.married;
    this.showAddChildrenBtn = this.popupNode.married;
  }

  cancelEditMode() {
    this.popupEditMode = false;
    this.clearSpouseDeails();
    this.clearChildren();
    this.popupDateOfDeathValid = this.util.isDateValid(
      this.popupNode.dateOfDeath
    );
  }

  updateFamilYMemberInfo() {
    // Check for Spouse details added
    this.buildSpouseObject();
    // Check for Children details added
    this.buildChildrenObjects();

    console.log('Updated Node:', this.popupNode);
    console.log('Spouse Node:', this.spouseNode);
    console.log('Children Nodes:', this.tempChildren);
    
    // Call to service to update the family member info
    this.familyService.updateFamilyMember(this.popupNode).subscribe(
      (response) => {
        // Handle successful update response
        console.log('Family member updated successfully:', response);
        this.handleFamilyData(response);
      },
      (error) => {
        // Handle error response
        console.error('Error updating family member:', error);
      }
    );
  }

  buildSpouseObject() {
    this.spouseNode = {
      firstName: this.spouseFirstName,
      lastName: this.spouseLastName,
      dateOfBirth: new Date(this.spouseDateOfBirth),
      dateOfDeath: new Date(this.spouseDateOfDeath),
      gender: this.spouseGender && this.spouseGender === 'MALE' ? 'MALE' : 'FEMALE',
      married: true,
      children: [],
      spouseIds: [ `${this.popupNode.id}` ],
      childrenIds: [],
    };
    if (this.popupNode.spouse && this.popupNode.spouse.length > 0) {
      console.warn('Spouse already exists for this node');
    } else {
      this.popupNode.spouse = [ this.spouseNode ];  
    }
  }

  buildChildrenObjects() {
    if(this.tempChildren && this.tempChildren.length > 0) {
      let fatherId = '';
      let motherId = '';

      if(this.popupNode.gender === 'MALE') {
        fatherId = this.popupNode.id.toString();
        motherId = this.popupNode.spouseIds && this.popupNode.spouseIds.length > 0 ? this.popupNode.spouseIds[0] : '';
      } else {
        motherId = this.popupNode.id.toString();
        fatherId = this.popupNode.spouseIds && this.popupNode.spouseIds.length > 0 ? this.popupNode.spouseIds[0] : '';
      }

      this.tempChildren.forEach((child) => {
        child.fatherId = fatherId;
        child.motherId = motherId;
        child.children = [];
        child.spouse = [];
        child.married = false;

        this.popupNode.children.push(child);
      });
    }
  }

  runTransition() {
    console.log('Transition trigerred');
    // Clear the SVG to remove any previous tree
    this.svg.selectAll("*").remove();
    // Redraw the tree
    this.drawTree();  // Call your existing method to draw the tree
    // Trigger the transition after redraw
    this.triggerTransition();
  }

  private triggerTransition(): void {
    const root = d3.hierarchy(this.treeData.rootNode, (d) => d.children);
    const treeLayout = d3
      .tree()
      .size([this.height, this.width - this.margin.left - this.margin.right]);
    treeLayout(root);
  
    // Animate links
    this.svg
      .selectAll('.link')
      .transition()
      .duration(2000)
      .ease(d3.easeLinear)
      .style('stroke-dashoffset', 0); // Revealing links if they were initially hidden
  
    // Animate nodes
    this.svg
      .selectAll('.node')
      .transition()
      .duration(2000);
      // .attr('transform', (d: any) => `translate(${d.y},${d.x})`);
  
    // Optional: Animate the color change or other attributes if required
    this.svg
      .selectAll('.node circle')
      .transition()
      .duration(2000)
      .style('fill', '#ffcc00');  // Example for color change
  
    this.svg
      .selectAll('.node text')
      .transition()
      .duration(2000)
      .style('fill', '#ffffff');
  }

  resetZoom(): void {
    console.log('Resetting zoom');
    const svgElement = this.svg;
    svgElement.transition().duration(500).call(
      d3.zoom().transform,
      d3.zoomIdentity
    );
  }

  toggleSpouseForm() {
    if(this.popupEditMode) {
      this.showSpouseForm = !this.showSpouseForm;
      this.showAddSpouseBtn = !this.showAddSpouseBtn;
    } else {
      console.warn('Cannot toggle spouse form when not in edit mode');
    }
    
  }

  setDateOfBirth(date: string) {
    this.spouseDateOfBirth = date ? date : '';
  }

  setDateOfDeath(date: string) {
    this.spouseDateOfDeath = date ? date : '';
  }

  saveSpouse() {
    console.log('Saving spouse details');
    console.log(`First Name: ${this.spouseFirstName}, Last Name: ${this.spouseLastName}, Date of Birth: ${this.spouseDateOfBirth}, Date of Death: ${this.spouseDateOfDeath}, Gender: ${this.spouseGender}`);
  }
  
  clearSpouseDeails() {
    this.showAddSpouseBtn = true;
    this.showSpouseForm = false;
    this.spouseFirstName = '';
    this.spouseLastName = '';
    this.spouseDateOfBirth = '';
    this.spouseDateOfDeath = '';
    this.spouseGender = '';
  }
    
  clearChildren() {
    this.showChildrenForm = false;
    this.showAddChildrenBtn = true;
    this.tempChildren = [];
  }

  addChildBlock() {
    this.showChildrenForm = true;
  }

  addChild() {
    let newChild: Node = {
      firstName: '',
      lastName: this.popupNode.lastName,
      dateOfBirth: new Date(),
      dateOfDeath: new Date(),
      gender: "FEMALE",
      married: false,
      children: [],
    };
    this.tempChildren.push(newChild);
  }

  setChildDateOfBirth(date, childIndex) {
    this.tempChildren[childIndex].dateOfBirth = date ? date : '';
  }

  setChildDateOfDeath(date, childIndex) {
    this.tempChildren[childIndex].dateOfDeath = date ? date : '';
  }

  removeChild(childIndex) {
    if (this.tempChildren && childIndex >= 0 && childIndex < this.tempChildren.length) {
      this.tempChildren.splice(childIndex, 1);
    } else {
      console.warn('Invalid child index:', childIndex);
    }
  }

  saveChildren() {
    console.log('Saving childrens');
    console.log(this.tempChildren);
  }

}