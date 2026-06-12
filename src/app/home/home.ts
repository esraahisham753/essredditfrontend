import { Component } from '@angular/core';
import { PostTile } from '../shared/post-tile/post-tile';
import { Sidebar } from '../shared/sidebar/sidebar';

@Component({
  selector: 'app-home',
  imports: [PostTile, Sidebar],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}

