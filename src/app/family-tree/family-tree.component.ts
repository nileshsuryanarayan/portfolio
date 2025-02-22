import { Component, OnInit, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import { Tree, Node } from './family-tree.model';
import { Arjun, Waman } from './family.data';
import { FamilyTreeService } from './family-tree.service';

@Component({
  selector: 'app-family-tree',
  templateUrl: './family-tree.component.html',
  styleUrls: ['./family-tree.component.scss']
})
export class FamilyTreeComponent implements OnInit {

  private svg: any;
  private margin = { top: 20, right: 90, bottom: 30, left: 90 };
  private width = 1000 - this.margin.left - this.margin.right;
  private height = 1400 - this.margin.top - this.margin.bottom;
  private treeData: Tree;
  private g: any;

  private BUFFER_SIZE: number = 100;

  popupVisible = false;
  popupStyle = {};
  selectedNode = null;
  popupNode: Node;
  popupFatherName: string;
  popupMotherName: string;
  popupDateOfBirth: string;
  popupDateOfDeath: string;
  popupEditMode = false;

  constructor(
    private el: ElementRef,
    private familyService: FamilyTreeService
  ) { }

  ngOnInit(): void {
    this.dataInit();
  }

  dataInit() {
    this.familyService.getFamilyData().subscribe(
      data => {
        // Do something with data
        console.log('Received Data: ', data);
        let tree: Tree = this.familyService.restructure(data);
        console.log('Restructured Data ======: ', tree);
        
        // Static data
        this.treeData = tree; // new Tree(Arjun);
        // this.treeData = new Tree(Arjun);
        this.createSvg();
        this.drawTree();
      },
      error => {
        // Handle error and display proper message on UI
        console.error(error);
      }
    );
  }

  private createSvg(): void {
    this.svg = d3.select(this.el.nativeElement).select('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .call(
        d3.zoom().on('zoom', (event: any) => {
          this.g.attr('transform', event.transform);
        })
      );

      this.g = this.svg.append('g').attr('transform', `translate(${this.margin.left},${this.margin.top})`);
      
  }

  private drawTree(): void {
    const root = d3.hierarchy(this.treeData.rootNode, (d) => d.children);
    const treeLayout = d3.tree().size([this.height, this.width - this.margin.left - this.margin.right]);
    treeLayout(root);
  
    // Calculate max width and height based on node positions
    const maxX = d3.max(root.descendants(), d => d.y);
    const maxY = d3.max(root.descendants(), d => d.x);

    // Update SVG dimensions if needed
    const newWidth = maxX + this.margin.left + this.margin.right; // Add margin as needed
    const newHeight = maxY + this.margin.top + this.margin.bottom; // Add margin as needed

    this.svg.attr('width', newWidth + this.BUFFER_SIZE);
    this.svg.attr('height', newHeight + this.BUFFER_SIZE);

    // Render links
    // this.svg.selectAll('.link')
    //   .data(root.links())
    //   .enter().append('line')
    //   .attr('class', 'link')
    //   .attr('x1', (d: any) => d.source.y + 100)
    //   .attr('y1', (d: any) => d.source.x + 15)
    //   .attr('x2', (d: any) => d.target.y + 0)
    //   .attr('y2', (d: any) => d.target.x + 15)
    //   .style('stroke', 'black');


    // Define gradient in SVG
    const gradient = this.svg.append('defs')
    .append('linearGradient')
    .attr('id', 'tree-gradient')
    .attr('x1', '0%')
    .attr('x2', '100%')
    .attr('y1', '0%')
    .attr('y2', '100%');

    gradient.append('stop')
    .attr('offset', '0%')
    .attr('stop-color', '#6b3f2b');  // Dark brown for tree trunk

    gradient.append('stop')
    .attr('offset', '100%')
    .attr('stop-color', '#d6b38b');  // Lighter brown for branch tips

    this.svg.selectAll('.link')
      .data(root.links())
      .enter().append('path')
      .attr('class', 'link')
      .attr('d', (d: any) => {
        const curvature = 0.5;  // Controls the curvature of the branches
        const sourceX = d.source.y + 100;
        const sourceY = d.source.x + 15;
        const targetX = d.target.y;
        const targetY = d.target.x + 15;
        
        return `M${sourceX},${sourceY}C${sourceX + curvature * (targetX - sourceX)},${sourceY + 30} ${targetX - curvature * (targetX - sourceX)},${targetY - 30} ${targetX},${targetY}`;
      })
      .style('fill', 'none')
      .style('stroke', 'url(#tree-gradient)')
      .style('stroke-width', (d: any) => {
        // Use depth of the node to determine stroke width (root node has depth 0, deeper nodes get smaller stroke)
        const parentDepth = d.source.depth;
        const maxDepth = d3.max(root.descendants(), (node: any) => node.depth); // Maximum depth in the tree

        // Tapering effect: deeper nodes will have thinner strokes
        return Math.max(1, 5 - (parentDepth / maxDepth) * 4);  // Return stroke width based on depth
      });



  
    // Render spouse connections and nodes
    const nodes = this.svg.selectAll('.node')
      .data(root.descendants())
      .enter().append('g')
      .attr('class', 'node')
      .attr('transform', (d: any) => `translate(${d.y},${d.x})`);
  
    nodes.append('rect')
      .attr('width', 100)
      .attr('height', 30)
      .attr('fill', 'white')
      .attr('stroke', (d: any) => d.data.gender === 'MALE' ? 'blue' : 'pink')
      .attr('id', (d: any) => `${d.data.firstName}-${d.data.lastName}`);


    // Append leaf shapes around each node
    nodes.append('path')
    .attr('d', 'M 0,0 Q 10,10 20,0 Q 10,-10 0,0 Z')  // Simple leaf shape (you can use more complex ones)
    .attr('fill', 'green')
    .attr('transform', (d: any) => `translate(${d.y - 60},${d.x - 30}) rotate(-30)`)
    .style('opacity', 0.7); // Slight transparency to make it subtle

    nodes.append('path')
    .attr('d', 'M 0,0 Q 10,10 20,0 Q 10,-10 0,0 Z')  // Leaf on the opposite side
    .attr('fill', 'green')
    .attr('transform', (d: any) => `translate(${d.y + 60},${d.x - 30}) rotate(30)`)
    .style('opacity', 0.7);
  
    nodes.append('text')
      .attr('dy', 20)
      .attr('x', 50)
      .style('text-anchor', 'middle')
      .text((d: any) => d.data.firstName)
      .on('mouseover', (event, d) => this.showDetails(d.data, d.x, d.y));
  
    // Render spouse nodes and links
    root.descendants().forEach(d => {
      if (d.data.spouse) {
        const spouses = d.data.spouse; // Array.isArray(d.data.spouse) ? d.data.spouse : [d.data.spouse];
        
        let d1y1 = d.y;
        let d1x1 = d.x;
        const yMultiplier = 40;
        console.log(`===> Original ${d.y}, ${d.x}`);
        spouses.forEach((spouse, index) => {
          // Render spouse node
          const spouseNode = {
            ...spouse,
            x: d1x1 + 40, // Align spouse on the same y-axis as the partner
            y: d1y1 // Adjust y position to display spouse node to the right
          };
          console.log('Partner: ', d.data.firstName);
          console.log('SpouseNodes =====: ', spouseNode);
          console.log(`===> Spouse${index}: ${d.y}, ${d.x}`);
          this.svg.append('g')
            .attr('class', 'node')
            .attr('id', `${d.data.firstName}`)
            .attr('transform', `translate(${spouseNode.y},${spouseNode.x})`).append('rect')
            .attr('width', 100)
            .attr('height', 30)
            .attr('fill', 'none')
            .attr('stroke', spouseNode.gender === 'MALE' ? 'blue' : 'pink')
            .attr('id', (d: any) => `${spouseNode.firstName}-${spouseNode.lastName}`);

          const nodes = this.svg.select(`#${d.data.firstName}`).append('text')
          .attr('dy', (index * yMultiplier) + 20)
          .attr('x', 50)
          .style('text-anchor', 'middle')
          .text(spouseNode.firstName)
          .on('mouseover', (event, d) => this.showDetails(spouseNode, spouseNode.x, spouseNode.y));
          // .on('mouseout', () => this.hideDetails());

          // Draw line between partner and spouse
          this.svg.append('line')  // Line 1
            .attr('class', 'link')
            .attr('x1', d1y1 + 70) // Partner's position
            .attr('y1', d1x1 + 30) // Center of partner's rectangle
            .attr('x2', spouseNode.y + 70) // Spouse's position
            .attr('y2', spouseNode.x) // Center of spouse's rectangle
            .style('stroke', 'black');

          // Draw line between partner and spouse
          this.svg.append('line') // Line 2
            .attr('class', 'link')
            .attr('x1', d1y1 + 30) // Partner's position
            .attr('y1', d1x1 + 30) // Center of partner's rectangle
            .attr('x2', spouseNode.y + 30) // Spouse's position
            .attr('y2', spouseNode.x) // Center of spouse's rectangle
            .style('stroke', 'black');

            d1y1 = spouseNode.y;
            d1x1 = spouseNode.x;
            console.log(`===> NewPosition${index}: ${d1y1}, ${d1x1}`);
        });
      }
    });




    this.svg.selectAll('.link')
      .data(root.links())
      .enter().append('path')
      .attr('class', 'link')
      .attr('d', (d: any) => {
        const sourceX = d.source.y + 100;
        const sourceY = d.source.x + 15;
        const targetX = d.target.y;
        const targetY = d.target.x + 15;

        // Multiple curve points to simulate multiple branches
        const curvature1 = 0.3;
        const curvature2 = 0.5;
        const curvature3 = 0.7;

        return `M${sourceX},${sourceY} 
                C${sourceX + curvature1 * (targetX - sourceX)},${sourceY - 50} 
                ${targetX - curvature2 * (targetX - sourceX)},${targetY - 50} 
                ${targetX},${targetY}`;
      })
      .style('fill', 'none')
      .style('stroke', 'black')
      .style('stroke-width', (d: any) => {
        const distance = Math.abs(d.source.x - d.target.x);  // Vertical distance between nodes
        const maxDistance = d3.max(root.links(), (link: any) => Math.abs(link.source.x - link.target.x));  // Maximum distance for normalization
        return Math.max(1, 5 - (distance / maxDistance) * 4);  // Tapered stroke width
      });

  }

  showDetails(data: Node, x: number, y: number): void {
    this.popupVisible = true;
    this.popupNode = data;
    this.popupFatherName = "";
    this.popupMotherName = "";
  }

  hideDetails(): void {
    this.popupVisible = false;
    this.popupEditMode = false;
  }

  switchToEditMode() {
    this.popupEditMode = true;
  }

  cancelEditMode() {
    this.popupEditMode = false;
  }

  updateFamilYMemberInfo() {
    console.log('UPDATE FAMILY MEMBER info called');
  }

}