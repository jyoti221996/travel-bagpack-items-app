import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-qna',
  templateUrl: './qna.component.html',
  styleUrls: ['./qna.component.css']
})
export class QnaComponent implements OnInit {
  // Task 3

  travelItems: { name: string, quantity: number, isChecked: boolean }[] = [];
  checkItem: any = [];
  sortOrder: 'asc' | 'desc' = 'asc';
  dropdownItem: string[] = ['All', 'Sort By Description', 'Selected Items'];
  itemName: string = '';
  newItem: any;
  numbers: number[] = Array.from({ length: 10 }, (_, index) => index + 1);
  selectedNumber: number = 1;
  selectedCheckbox:any;
  errorMsg: any;
  errorInput: boolean = false;
  message: any;
  fullList: boolean = false;
  listCount: any = "";
  progress: any = '';
  noChcek: any;
  checkedIndexes: number[] = [];
  checkedItemsOne: any;
  btnHide: boolean = false;  
  selectedArrayIndex: any = undefined;
  updateBtn:boolean = false;


  constructor() { }

  ngOnInit(): void {
    this.getLocal();
    this.allinOne();    
  }


  //// Task 3: Make a travel list with their quntity which shows important items first on click of checkbox ////

  addItem() {
    this.newItem = {
      name: this.itemName,
      quantity: this.selectedNumber,
      isChecked:this.selectedCheckbox
    };

    if (this.itemName != "") {      
      this.travelItems.push(this.newItem);
      this.fullList = false;
      this.errorInput = false;
      this.updateBtn = false;
      this.saveLocal();
    }
    else {
      this.errorInput = true;
      this.errorMsg = "Write item name";
    }

    this.listCount = this.travelItems.length;
    this.totalCheckedItems();
    this.itemName = '';
    this.selectedNumber = 1;
  }

  removeItem(index: number) {
    let result = window.confirm('Are you sure you want to delete this item 😞?');
    if (result) {
      this.travelItems.splice(index, 1);
      this.saveLocal();
      this.listCount = this.travelItems.length;
      this.fullList = false;
      this.totalCheckedItems();
    } else {
      this.listCount = this.travelItems.length;
    }
  }

  deleteAll() {
    this.travelItems = [];
    this.listCount = this.travelItems.length;
    this.totalCheckedItems();
    this.saveLocal();
  }

  onCheckBox(index: number) {
    if (this.travelItems[index].isChecked) {
      this.checkedItemsOne = localStorage.setItem("selectedTravelItems", JSON.stringify(this.travelItems));
      this.saveLocal();
      this.totalCheckedItems();
    }
    else {
      this.checkedIndexes = this.checkedIndexes.filter(i => i !== index);
      this.checkedItemsOne = localStorage.setItem("selectedTravelItems", JSON.stringify(this.travelItems)); this.getLocal();
      this.saveLocal();
    }
  }

  sortItems(event: any): void {
    if (event.target.value == 'Sort By Description') {
      this.travelItems.sort((a, b) => a.name.localeCompare(b.name));
      console.log("Sort");
    }
    else if (event.target.value == 'All') {
      this.travelItems;
      this.checkMethod();
      this.getLocal();
      console.log("All");
    }
    else if (event.target.value == 'Selected Items') {
      this.checkMethod();
      this.getLocal();
      this.travelItems.sort((a, b) => {
        if (a.isChecked && !b.isChecked) {
          return -1;
        } else if (!a.isChecked && b.isChecked) {
          return 1;
        } else {
          return 0;
        }
      });
    }
  }

  checkMethod() {
    this.checkItem = this.travelItems.filter(item => item.isChecked);
    this.travelItems = this.checkItem;
    console.log("Check" + this.travelItems);
  }

  allinOne() {
    this.listCount = this.travelItems.length;
    this.totalCheckedItems();
  }

  totalCheckedItems() {
    this.noChcek = this.travelItems.filter(item => item.isChecked).length;
    this.progress = Number(Math.round((this.noChcek / 10) * 100));
    if (this.noChcek == 10 && this.progress === 100) {
      this.fullList = true;
      this.btnHide = true;
      this.message = "Yayyy! Now you are ready to go."
    } else if (this.noChcek <= 10 && this.progress <= 100) {
      this.fullList = false;
    } else {
      this.fullList = true;
      this.btnHide = false;
      this.message = "Oops!! You don't have much space to your stuff"
    }
  }

  okButton() {
    this.fullList = false;
  }

  editItem(dataItem: any, idx: number) {    
    this.selectedArrayIndex = idx;
    this.itemName = dataItem.name;
    this.selectedNumber = dataItem.quantity;  
    this.selectedCheckbox = dataItem.isChecked;
    this.updateBtn = true;
  }

  update() {   
    this.travelItems[this.selectedArrayIndex] = {name : this.itemName , quantity: this.selectedNumber, isChecked: this.selectedCheckbox};
    this.travelItems = Object.assign([], this.travelItems);
    this.itemName = '';
    this.updateBtn = false;
    this.saveLocal();
  }

  saveLocal() {
    localStorage.setItem("selectedTravelItems", JSON.stringify(this.travelItems));
  }

  getLocal() {
    let value = localStorage.getItem("selectedTravelItems");
    if (value != null) {
      this.travelItems = JSON.parse(value!);
      this.totalCheckedItems();
    }

  }
}
