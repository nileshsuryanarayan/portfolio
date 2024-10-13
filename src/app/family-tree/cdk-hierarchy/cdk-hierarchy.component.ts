import { Component, Input } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { TreeNode } from '../family-node.model';

@Component({
  selector: 'app-cdk-hierarchy',
  templateUrl: './cdk-hierarchy.component.html',
  styleUrls: ['./cdk-hierarchy.component.scss'],
})
export class CdkHierarchyComponent {
  treeControl = new NestedTreeControl<TreeNode>((node: TreeNode) => node.children);
  dataSource = new MatTreeNestedDataSource<TreeNode>();

  @Input()
  set data(data: TreeNode[]) {
    this.dataSource.data = data;
  }

  hasChild = (_: number, node: TreeNode) =>
    !!node.children && node.children.length > 0;
}
