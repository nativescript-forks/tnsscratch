var observable_1 = require("data/observable");
var linkPickerEventArgs_1 = require("./common/events/linkPickerEventArgs");
var frameModule = require("ui/frame");
var globalModule = require("./common/myglobal");
var LinkPickerController = (function (_super) {
    __extends(LinkPickerController, _super);
    function LinkPickerController() {
        _super.apply(this, arguments);
        this.screens = [];
    }
    /*
        public onShowingModally(args: EventData) {
            console.log(">>> linkPicker.onShowingModally");
            var modalPage = <Page>args.object;
            if (modalPage.ios && modalPage.ios.modalPresentationStyle === UIModalPresentationStyle.UIModalPresentationFullScreen) {
                console.log(">>> Setting modalPage.ios.modalPresentationStyle to UIModalPresentationStyle.UIModalPresentationOverFullScreen");
                modalPage.ios.modalPresentationStyle = UIModalPresentationStyle.UIModalPresentationOverFullScreen;
            }
        }
        */
    LinkPickerController.prototype.onShownModally = function (args) {
        console.log(">>> linkPicker.onShownModally, context: " + args.context);
        this.set("selectedScreenName", args.context);
        this.closeCallback = args.closeCallback;
        var modalPage = args.object;
        if (frameModule.topmost().currentPage.modal !== args.object) {
            throw new Error("frameModule.topmost().currentPage.modal.id: " + frameModule.topmost().currentPage.modal.id + "; modalPage.id: " + modalPage.id);
        }
    };
    LinkPickerController.prototype.onLoaded = function (args) {
        console.log(">>> linkPicker.onLoaded");
        this.page = args.object;
        this.screens = globalModule.screens;
        this.page.bindingContext = this;
        this.page.animate({
            translate: { x: 0, y: -1000 },
            opacity: 1,
            duration: 300
        });
    };
    LinkPickerController.prototype.listViewItemTap = function (args) {
        var itemIndex = args.index;
        var selectedScreen = this.screens[itemIndex];
        console.log('listViewItemTap idx: ' + itemIndex);
        this.set("selectedScreenName", selectedScreen.name);
    };
    LinkPickerController.prototype.doneTap = function (args) {
        console.log(">>> linkPicker.doneTap");
        if (this.closeCallback) {
            var selectedScreenName = this.get("selectedScreenName");
            var lpArgs = new linkPickerEventArgs_1.LinkPickerClosedEventArgs();
            lpArgs.selectedName = selectedScreenName;
            this.closeCallback(lpArgs);
        }
        else {
            frameModule.topmost().goBack();
        }
    };
    LinkPickerController.prototype.deleteTap = function (args) {
        console.log(">>> linkPicker.deleteTap");
        if (this.closeCallback) {
            var selectedScreenName = this.get("selectedScreenName");
            var lpArgs = new linkPickerEventArgs_1.LinkPickerClosedEventArgs();
            lpArgs.linkDeleted = true;
            this.closeCallback(lpArgs);
        }
        else {
            frameModule.topmost().goBack();
        }
    };
    return LinkPickerController;
})(observable_1.Observable);
exports.LinkPickerController = LinkPickerController;
var lpc = new LinkPickerController();
//export var onShowingModally = args => lpc.onShowingModally(args);
exports.onShownModally = function (args) { return lpc.onShownModally(args); };
exports.onLoaded = function (args) { return lpc.onLoaded(args); };
