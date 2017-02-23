import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { ObservableArray } from "data/observable-array";
import { DataItem } from "../dataItem";
import { ListViewLinearLayout, ListViewEventData, RadListView, ListViewLoadOnDemandMode }from "nativescript-telerik-ui-pro/listview";
import * as applicationModule from "application";
import * as Timer  from "timer";
var posts = require("../../listview/posts.json")

@Component({
    moduleId: module.id,
    selector: "tk-listview-load-on-demand",
    templateUrl: "listview-load-on-demand.component.html",
    styleUrls: ["listview-load-on-demand.component.css"]
})
// >> angular-listview-load-on-demand-code
export class ListViewLoadOnDemandComponent implements OnInit {
    private _dataItems: ObservableArray<DataItem>;
    private _numberOfAddedItems;

    constructor(private _changeDetectionRef: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.initDataItems();
        //this._changeDetectionRef.detectChanges();
    }

    public get dataItems(): ObservableArray<DataItem> {
        return this._dataItems;
    }

    public onLoadMoreItemsRequested(args: ListViewEventData) {
        var that = new WeakRef(this);
        Timer.setTimeout(function () {
            var listView: RadListView = args.object;
            var initialNumberOfItems = that.get()._numberOfAddedItems;
            for (var i = that.get()._numberOfAddedItems; i < initialNumberOfItems + 2; i++) {
                if (i > posts.names.length - 1) {
                    listView.loadOnDemandMode = ListViewLoadOnDemandMode[ListViewLoadOnDemandMode.None];
                    break;
                }

                var imageUri = applicationModule.android ? posts.images[i].toLowerCase() : posts.images[i];
                that.get()._dataItems.push(new DataItem(i, posts.names[i], "This is item description", posts.titles[i], posts.text[i], "res://" + imageUri));
                that.get()._numberOfAddedItems++;
            }

            listView.notifyLoadOnDemandFinished();
        }, 1000);
        args.returnValue = true;
    }

    private initDataItems() {
        this._dataItems = new ObservableArray<DataItem>();
        this._numberOfAddedItems = 0;
        for (var i = 0; i < posts.names.length - 15; i++) {
            this._numberOfAddedItems++;
            if (applicationModule.android) {
                this._dataItems.push(new DataItem(i, posts.names[i], "This is item description", posts.titles[i], posts.text[i], "res://" + posts.images[i].toLowerCase()));
            }
            else {
                this._dataItems.push(new DataItem(i, posts.names[i], "This is item description", posts.titles[i], posts.text[i], "res://" + posts.images[i]));
            }
        }
    }
}
// << angular-listview-load-on-demand-code