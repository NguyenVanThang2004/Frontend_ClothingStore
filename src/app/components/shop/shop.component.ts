import { Component } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent {
  showSearch: boolean = false;
  showFilter: boolean = false;

  keyword: string = '';

  toggleSearch() {
    this.showSearch = !this.showSearch;
    if (this.showSearch) this.showFilter = false; // nếu mở search thì tắt filter
  }

  toggleFilter() {
    this.showFilter = !this.showFilter;
    if (this.showFilter) this.showSearch = false; // nếu mở filter thì tắt search
  }

  onSearch() {
    console.log('Searching for:', this.keyword);
    // gọi API search hoặc filter danh sách ở đây
  }
}
