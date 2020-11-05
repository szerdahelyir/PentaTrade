import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-weather-search',
  templateUrl: './weather-search.component.html',
  styleUrls: ['./weather-search.component.css']
})
export class WeatherSearchComponent implements OnInit {
  
  public searchForm:FormGroup
  result: Observable<any[]>;
  searchResult;
  apiRoot: string = "http://api.openweathermap.org/data/2.5/weather";
  apiKey: string = "ccbbc73585d54b6bf2ccc4b09af6b87c"

  constructor(
    private formBuilder:FormBuilder,
    private http:HttpClient
    ) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      searchField: [null, [Validators.required,Validators.minLength(3)]],
      typeSelect:[null,[ Validators.required]],
    });
    console.log(this.searchForm.value["typeSelect"]);
  }

  submit(){
    let apiURL = `${this.apiRoot}?q=${this.searchForm.value["searchField"]}&APPID=${this.apiKey}&units=${this.searchForm.value["typeSelect"]}`;
    console.log(apiURL);
    this.result=this.search(this.searchForm.value["searchField"]);
    this.result.subscribe(result=> this.searchResult=(result)); 
  }

  search(term: string): Observable<any[]> {
    let apiURL = `${this.apiRoot}?q=${this.searchForm.value["searchField"]}&APPID=${this.apiKey}&units=${this.searchForm.value["typeSelect"]}`;
    return this.http.get<any[]>(apiURL);
  }
}
