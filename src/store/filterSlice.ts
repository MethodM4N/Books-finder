import { makeAutoObservable } from 'mobx';

interface IFilterSlice {
  searchValue: string;
  sortValue: string;
  categoryValue: string;
}

class filterSlice implements IFilterSlice {
  searchValue = '';
  sortValue = 'Relevance';
  categoryValue = 'All';

  constructor() {
    makeAutoObservable(this);
  }

  setSearchValue(searchValue: string) {
    this.searchValue = searchValue;
  }
  setSortValue(searchValue: string) {
    this.sortValue = searchValue;
  }
  setCategoryValue(searchValue: string) {
    this.categoryValue = searchValue;
  }
}

export default new filterSlice();
