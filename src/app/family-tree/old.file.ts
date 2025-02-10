import { Component, OnInit, ElementRef, Input } from '@angular/core';

import * as d3 from 'd3';

// import { Tree, Node } from '../models/tree.model';

@Component({

    selector: 'app-family-tree',

    templateUrl: './family-tree.component.html',

    styleUrls: ['./family-tree.component.css']

})

export class FamilyTreeComponent implements OnInit {

    @Input() treeData!: Tree;

    private svg: any;

    private margin = { top: 20, right: 90, bottom: 30, left: 90 };

    private width = 960 - this.margin.left - this.margin.right;

    private height = 600 - this.margin.top - this.margin.bottom;

    private g: any;

    constructor(private el: ElementRef) { }

    ngOnInit(): void {

        this.createSvg();

        this.drawTree(this.treeData.root);

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

    private drawTree(rootNode: Node): void {

        const treeLayout = d3.tree<Node>().size([this.height, this.width]);

        const root = d3.hierarchy(rootNode, (d) => d.children);

        treeLayout(root);

        // Links between nodes

        this.g.selectAll('.link')

            .data(root.links())

            .enter()

            .append('path')

            .attr('class', 'link')

            .attr('d', d3.linkVertical()

                .x((d: any) => d.x)

                .y((d: any) => d.y));

        // Nodes

        const node = this.g.selectAll('.node')

            .data(root.descendants())

            .enter()

            .append('g')

            .attr('class', 'node')

            .attr('transform', (d: any) => `translate(${d.x},${d.y})`);

        // Circle for each node

        node.append('circle').attr('r', 10);

        // Text for each node

        node.append('text')

            .attr('dy', '.35em')

            .attr('x', (d: any) => (d.children ? -15 : 15))

            .style('text-anchor', (d: any) => (d.children ? 'end' : 'start'))

            .text((d: any) => d.data.name);

    }

}