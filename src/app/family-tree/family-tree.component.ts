import { Component, Input, OnInit, ElementRef } from "@angular/core";  
import * as d3 from "d3";
import { Tree } from "./tree.model";
import { Node } from "./node.model";

@Component({
  selector: 'family-tree',
  templateUrl: './family-tree.component.html',
  styleUrls: ['./family-tree.component.scss'],
})
export class FamilyTreeComponent implements OnInit {
  private treeData: Tree;

  private svg: any;
  private margin = { top: 20, right: 90, bottom: 30, left: 90 };
  private width = 960 - this.margin.left - this.margin.right;
  private height = 600 - this.margin.top - this.margin.bottom;
  private g: any;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.initData();
    this.createSvg();
    this.drawTree(this.treeData.root);
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

  private drawTree(rootNode: Node): void {
    const treeLayout = d3.tree<Node>().size([this.height, this.width]);
    const root = d3.hierarchy(rootNode, (d) => d.children);
    treeLayout(root);
    // Links between nodes
    this.g
      .selectAll('.link')
      .data(root.links())
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr(
        'd',
        d3
          .linkVertical()
          .x((d: any) => d.x)
          .y((d: any) => d.y)
      );

    // Nodes
    const node = this.g
      .selectAll('.node')
      .data(root.descendants())
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', (d: any) => `translate(${d.x},${d.y})`);

    // Circle for each node
    node.append('circle').attr('r', 10);

    // Text for each node
    node
      .append('text')
      .attr('dy', '.35em')
      .attr('x', (d: any) => (d.children ? -15 : 15))
      .style('text-anchor', (d: any) => (d.children ? 'end' : 'start'))
      .text((d: any) => d.data.name);
  }

  initData() {
    let mummy: Node | null = null;
    let pappa: Node | null = null;

    let sandeep: Node = {
      name: 'Sandeep',
      father: null,
      mother: null,
      dateOfBirth: '01/11/1992',
      dateOfDeath: '',
      isMarried: true,
      spouse: null,
      children: []
    };
    let nilesh: Node = {
      name: 'Nilesh',
      father: null,
      mother: null,
      dateOfBirth: '21/10/1996',
      dateOfDeath: '',
      isMarried: true,
      spouse: null,
      children: []
    };
    let rohit: Node = {
      name: 'Rohit',
      father: null,
      mother: null,
      dateOfBirth: '27/04/1998',
      dateOfDeath: '',
      isMarried: true,
      spouse: null,
      children: []
    };

    pappa = {
      name: 'Babasaheb',
      father: null,
      mother: null,
      dateOfBirth: '02/01/1968',
      dateOfDeath: '',
      isMarried: true,
      spouse: mummy,
      children: [
        sandeep,
        nilesh,
        rohit
      ]
    };

    mummy = {
      name: 'Ranjana',
      father: null,
      mother: null,
      dateOfBirth: '22/03/1972',
      dateOfDeath: '',
      isMarried: true,
      spouse: pappa,
      children: [
        sandeep,
        nilesh,
        rohit
      ]
    }

    this.treeData = {
      root: pappa
    };

  }

  

}
