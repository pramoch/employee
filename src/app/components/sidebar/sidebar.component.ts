import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  items = [
    { label: 'Employees', link: '/employees' },
    { label: 'Branches', link: '/branches' },
    { label: 'Sales', link: '/sales'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
