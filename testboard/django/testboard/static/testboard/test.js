require.config({
    baseUrl: "{{SPLUNKWEB_URL_PREFIX}}/static/js",
    waitSeconds: 0 // Disable require.js load timeout
});

//
// LIBRARY REQUIREMENTS
//
// In the require function, we include the necessary libraries and modules for
// the HTML dashboard. Then, we pass variable names for these libraries and
// modules as function parameters, in order.
// 
// When you add libraries or modules, remember to retain this mapping order
// between the library or module and its function parameter. You can do this by
// adding to the end of these lists, as shown in the commented examples below.

require([
    "splunkjs/mvc",
    "splunkjs/mvc/utils",
    "splunkjs/mvc/tokenutils",
    "underscore",
    "jquery",
    "splunkjs/mvc/simplexml",
    "splunkjs/mvc/headerview",
    "splunkjs/mvc/footerview",
    "splunkjs/mvc/simplexml/dashboardview",
    "splunkjs/mvc/simplexml/dashboard/panelref",
    "splunkjs/mvc/simplexml/element/chart",
    "splunkjs/mvc/simplexml/element/event",
    "splunkjs/mvc/simplexml/element/html",
    "splunkjs/mvc/simplexml/element/list",
    "splunkjs/mvc/simplexml/element/map",
    "splunkjs/mvc/simplexml/element/single",
    "splunkjs/mvc/simplexml/element/table",
    "splunkjs/mvc/simpleform/formutils",
    "splunkjs/mvc/simplexml/eventhandler",
    "splunkjs/mvc/simpleform/input/dropdown",
    "splunkjs/mvc/simpleform/input/radiogroup",
    "splunkjs/mvc/simpleform/input/multiselect",
    "splunkjs/mvc/simpleform/input/checkboxgroup",
    "splunkjs/mvc/simpleform/input/text",
    "splunkjs/mvc/simpleform/input/timerange",
    "splunkjs/mvc/simpleform/input/submit",
    "splunkjs/mvc/searchmanager",
    "splunkjs/mvc/savedsearchmanager",
    "splunkjs/mvc/postprocessmanager",
    "splunkjs/mvc/simplexml/urltokenmodel"
    // Add comma-separated libraries and modules manually here, for example:
    // ..."splunkjs/mvc/simplexml/urltokenmodel",
    // "splunkjs/mvc/checkboxview"
    ],
    function(
        mvc,
        utils,
        TokenUtils,
        _,
        $,
        DashboardController,
        HeaderView,
        FooterView,
        Dashboard,
        PanelRef,
        ChartElement,
        EventElement,
        HtmlElement,
        ListElement,
        MapElement,
        SingleElement,
        TableElement,
        FormUtils,
        EventHandler,
        DropdownInput,
        RadioGroupInput,
        MultiSelectInput,
        CheckboxGroupInput,
        TextInput,
        TimeRangeInput,
        SubmitButton,
        SearchManager,
        SavedSearchManager,
        PostProcessManager,
        UrlTokenModel

        // Add comma-separated parameter names here, for example: 
        // ...UrlTokenModel, 
        // CheckboxView
        ) {



        var pageLoading = true;


        // 
        // TOKENS
        //
        
        // Create token namespaces
        var urlTokenModel = new UrlTokenModel();
        mvc.Components.registerInstance('url', urlTokenModel);
        var defaultTokenModel = mvc.Components.getInstance('default', {create: true});
        var submittedTokenModel = mvc.Components.getInstance('submitted', {create: true});

        urlTokenModel.on('url:navigate', function() {
            defaultTokenModel.set(urlTokenModel.toJSON());
            if (!_.isEmpty(urlTokenModel.toJSON()) && !_.all(urlTokenModel.toJSON(), _.isUndefined)) {
                submitTokens();
            } else {
                submittedTokenModel.clear();
            }
        });

        // Initialize tokens
        defaultTokenModel.set(urlTokenModel.toJSON());

        function submitTokens() {
            // Copy the contents of the defaultTokenModel to the submittedTokenModel and urlTokenModel
            FormUtils.submitForm({ replaceState: pageLoading });
        }

        function setToken(name, value) {
            defaultTokenModel.set(name, value);
            submittedTokenModel.set(name, value);
        }

        function unsetToken(name) {
            defaultTokenModel.unset(name);
            submittedTokenModel.unset(name);
        }

        
        
        //
        // SEARCH MANAGERS
        //

        new SavedSearchManager({
            "id": "search1",
            "cancelOnUnload": true,
            "searchname": "Comparison of Actions and Conversion Rates by Product",
            "status_buckets": 0,
            "app": utils.getCurrentApp(),
            "auto_cancel": 90,
            "preview": true,
            "cache": "scheduled",
            "runWhenTimeIsUndefined": false
        }, {tokens: true, tokenNamespace: "submitted"});

        var search2 = new SearchManager({
            "id": "search2",
            "search": "sourcetype=access_* status=200 action=purchase | top categoryId",
            "latest_time": "$Buttercup_Games_Time_Range.latest$",
            "cancelOnUnload": true,
            "status_buckets": 0,
            "earliest_time": "$Buttercup_Games_Time_Range.earliest$",
            "app": utils.getCurrentApp(),
            "auto_cancel": 90,
            "preview": true,
            "runWhenTimeIsUndefined": false
        }, {tokens: true, tokenNamespace: "submitted"});

        new SavedSearchManager({
            "id": "search3",
            "cancelOnUnload": true,
            "searchname": "Purchasing trends",
            "status_buckets": 0,
            "app": utils.getCurrentApp(),
            "auto_cancel": 90,
            "preview": true,
            "cache": "scheduled",
            "runWhenTimeIsUndefined": false
        }, {tokens: true, tokenNamespace: "submitted"});



        //
        // SPLUNK HEADER AND FOOTER
        //

        new HeaderView({
            id: 'header',
            section: 'dashboards',
            el: $('.header'),
            acceleratedAppNav: true,
            useSessionStorageCache: true,
            splunkbar: true,
            appbar: true,
            litebar: false,
        }, {tokens: true}).render();

        new FooterView({
            id: 'footer',
            el: $('.footer')
        }, {tokens: true}).render();


        //
        // DASHBOARD EDITOR
        //

        new Dashboard({
            id: 'dashboard',
            el: $('.dashboard-body'),
            showTitle: true,
            editable: true
        }, {tokens: true}).render();


        //
        // VIEWS: VISUALIZATION ELEMENTS
        //

        var element1 = new ChartElement({
            "id": "element1",
            "charting.axisLabelsY.majorUnit": "500",
            "wrap": "true",
            "charting.axisY2.scale": "linear",
            "charting.legend.labelStyle.overflowMode": "ellipsisMiddle",
            "charting.chart.stackMode": "default",
            "charting.axisY2.maximumNumber": "100",
            "charting.axisTitleY2.visibility": "visible",
            "charting.chart.nullValueMode": "gaps",
            "charting.layout.splitSeries": "0",
            "charting.chart": "column",
            "charting.chart.bubbleMinimumSize": "10",
            "charting.chart.overlayFields": "viewsToPurchase,cartToPurchase",
            "dataOverlayMode": "none",
            "charting.chart.bubbleMaximumSize": "50",
            "charting.axisLabelsY2.majorUnit": "20",
            "charting.axisLabelsX.majorLabelStyle.overflowMode": "ellipsisNone",
            "charting.axisX.scale": "linear",
            "resizable": true,
            "charting.axisY.scale": "linear",
            "charting.axisY.maximumNumber": "2500",
            "charting.axisTitleX.visibility": "visible",
            "charting.legend.placement": "right",
            "charting.axisTitleY2.text": "Conversion Rates",
            "charting.drilldown": "all",
            "charting.chart.sliceCollapsingThreshold": "0.01",
            "charting.chart.bubbleSizeBy": "area",
            "charting.axisLabelsX.majorLabelStyle.rotation": "-45",
            "charting.axisTitleY.visibility": "visible",
            "charting.axisTitleY.text": "Actions",
            "rowNumbers": "false",
            "charting.chart.style": "shiny",
            "charting.axisY2.enabled": "true",
            "managerid": "search1",
            "el": $('#element1')
        }, {tokens: true, tokenNamespace: "submitted"}).render();

        
        var element2 = new ChartElement({
            "id": "element2",
            "charting.legend.labelStyle.overflowMode": "ellipsisMiddle",
            "charting.axisY2.scale": "inherit",
            "charting.chart.stackMode": "default",
            "charting.axisLabelsX.majorLabelStyle.rotation": "0",
            "charting.axisTitleY2.visibility": "visible",
            "charting.chart.nullValueMode": "gaps",
            "charting.layout.splitSeries": "0",
            "charting.chart": "pie",
            "charting.chart.bubbleMinimumSize": "10",
            "charting.chart.bubbleMaximumSize": "50",
            "charting.axisLabelsX.majorLabelStyle.overflowMode": "ellipsisNone",
            "resizable": true,
            "charting.axisY.scale": "linear",
            "charting.legend.placement": "right",
            "charting.drilldown": "all",
            "charting.chart.sliceCollapsingThreshold": "0.01",
            "charting.chart.style": "shiny",
            "charting.axisX.scale": "linear",
            "charting.axisTitleY.visibility": "visible",
            "charting.axisTitleX.visibility": "visible",
            "charting.chart.bubbleSizeBy": "area",
            "charting.axisY2.enabled": "false",
            "managerid": "search2",
            "el": $('#element2')
        }, {tokens: true, tokenNamespace: "submitted"}).render();

        
        var element3 = new TableElement({
            "id": "element3",
            "drilldown": "row",
            "rowNumbers": "undefined",
            "wrap": "undefined",
            "managerid": "search3",
            "el": $('#element3')
        }, {tokens: true, tokenNamespace: "submitted"}).render();
        


        //
        // VIEWS: FORM INPUTS
        //
        var input1 = new TimeRangeInput({
            "id": "input1",
            "default": {"latest_time": null, "earliest_time": "0"},
            "searchWhenChanged": true,
            "earliest_time": "$form.Buttercup_Games_Time_Range.earliest$",
            "latest_time": "$form.Buttercup_Games_Time_Range.latest$",
            "el": $('#input1')
        }, {tokens: true}).render();

        input1.on("change", function(newValue) {
            FormUtils.handleValueChange(input1);
        });

    

        // Initialize time tokens to default
        if (!defaultTokenModel.has('earliest') && !defaultTokenModel.has('latest')) {
            defaultTokenModel.set({ earliest: '0', latest: '' });
        }

        if (!_.isEmpty(urlTokenModel.toJSON())){
            submitTokens();
        }


        //
        // DASHBOARD READY
        //

        DashboardController.ready();
        pageLoading = false;

    }
);