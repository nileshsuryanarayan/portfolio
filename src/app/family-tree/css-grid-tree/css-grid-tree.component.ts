import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TreeNode } from '../family-node.model';

@Component({
  selector: 'app-css-grid-tree',
  templateUrl: './css-grid-tree.component.html',
  styleUrls: ['./css-grid-tree.component.scss'],
})
export class CssGridTreeComponent implements OnInit, OnChanges {

  @Input() data: TreeNode[];
  divClass: string = 'grid-';

  ngOnInit(): void {
    // this.setup();
    if(this.data.length > 0 && this.data.length <= 12) {
      this.divClass += '' + Math.floor(12 / this.data.length);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.data.length > 0 && this.data.length <= 12) {
      this.divClass += '' + Math.floor(12 / this.data.length);
    }
  }

  setup() {
    // this.data = DUMMY_TREE;
  }

}
