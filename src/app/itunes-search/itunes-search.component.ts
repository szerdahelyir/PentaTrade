import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { SearchResult } from '../search-result';

@Component({
  selector: 'app-itunes-search',
  templateUrl: './itunes-search.component.html',
  styleUrls: ['./itunes-search.component.css']
})
export class ItunesSearchComponent implements OnInit {

  public searchForm:FormGroup
  results: Observable<any[]>;
  searchResults;
  apiRoot: string = "https://itunes.apple.com/search";
  

  constructor(
    private formBuilder:FormBuilder,
    private http:HttpClient
  ) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      searchField: [null, [Validators.required,Validators.minLength(3)]],
    });
  }

  submit(){
    let apiURL = `${this.apiRoot}?term=${this.searchForm.value["searchField"]}`;
    this.results=this.search(this.searchForm.value["searchField"]);
    this.results.subscribe(results=> this.searchResults=(results["results"])); 
  }

  search(term: string): Observable<any[]> {
    let apiURL = `${this.apiRoot}?term=${term}`;
    return this.http.get<any[]>(apiURL);
  }

}
