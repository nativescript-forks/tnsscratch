import { HelloWorldModel } from "./page1-view-model";
import { Page } from "ui/page";

var viewModel = new HelloWorldModel();

export function pageLoaded(args) {
    var page = <Page>args.object;
    page.bindingContext = viewModel;
}
