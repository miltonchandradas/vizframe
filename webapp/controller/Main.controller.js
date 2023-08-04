sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/viz/ui5/data/FlattenedDataset",
    "sap/viz/ui5/controls/common/feeds/FeedItem",
    "sap/viz/ui5/controls/Popover",
    "sap/viz/ui5/format/ChartFormatter",
    "sap/viz/ui5/api/env/Format",
    "com/sap/vizframe/utils/datamanipulationUtils",
    "csvtojson",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (
    Controller,
    JSONModel,
    MessageToast,
    FlattenedDataset,
    FeedItem,
    Popover,
    ChartFormatter,
    Format,
    datamanipulationUtils,
    csvtojson
  ) {
    "use strict";

    return Controller.extend("com.sap.vizframe.controller.Main", {
      onInit: async function () {
        let csvContents = "name,email\nMilton,milton@test.com";
        let promotionDetails = await csvtojson({
          delimiter: ",",
        }).fromString(csvContents);

        this._debounce = this.debounce(this.doSomework.bind(this), 2000);

        this._vizFrameModel =
          this.getOwnerComponent().getModel("vizFrameModel");
        this._lineModel = this.getOwnerComponent().getModel("lineModel");
        this._tableModel = this.getOwnerComponent().getModel("tableModel");
        this._vizFrameModel2 =
          this.getOwnerComponent().getModel("vizFrameModel2");
        this._lineModel2 = this.getOwnerComponent().getModel("lineModel2");
        this._tableModel2 = this.getOwnerComponent().getModel("tableModel2");

        Format.numericFormatter(ChartFormatter.getInstance());
        let formatPattern = ChartFormatter.DefaultPattern;

        let vizFrame = this.byId("vizFrameBar");
        let dataset = new FlattenedDataset({
          dimensions: [
            {
              name: "Employee Position",
              value: "{Position}",
            },
          ],
          measures: [
            {
              name: "Compensation",
              value: "{Value}",
            },
            {
              name: "Peer Review",
              value: "{Value1}",
            },
          ],
          data: {
            path: "/Payscale",
          },
        });

        vizFrame.setDataset(dataset);

        vizFrame.setModel(this._vizFrameModel);

        let lines = this._lineModel.getData();
        this._tableModel.setData(
          datamanipulationUtils.populateTableModel(
            this._lineModel,
            this._vizFrameModel
          )
        );

        vizFrame.setVizProperties({
          legend: { visible: false },
          plotArea: {
            colorPalette: ["#427CAC", "#FFFFFF"],
            referenceLine: {
              line: { valueAxis: lines },
              defaultStyle: { size: 3, type: "solid" },
            },
            // drawingEffect: "glossy",
            dataPointSize: { min: 10, max: 10 },
            gridline: { visible: true, type: "dash" },
          },
          title: {
            visible: false,
          },
          dataLabel: {
            visible: false,
            // formatString: formatPattern.SHORTFLOAT_MFD2,
            style: { color: "black" },
            position: "outside",
          },
          categoryAxis: {
            label: {
              visible: false,
            },
            title: {
              visible: false,
            },
          },
          valueAxis: {
            scale: {
              fixedRange: true,
              minValue: 65000,
              maxValue: 91000,
            },
            label: {
              visible: true,
              formatString: formatPattern.SHORTFLOAT,
            },
            title: {
              visible: false,
            },
          },
        });

        let xAxis = new FeedItem({
          uid: "valueAxis",
          type: "Measure",
          values: ["Peer Review", "Compensation"],
        });

        let yAxis = new FeedItem({
          uid: "categoryAxis",
          type: "Dimension",
          values: ["Employee Position"],
        });

        vizFrame.addFeed(xAxis);
        vizFrame.addFeed(yAxis);

        let vizFrame2 = this.byId("vizFrameBar2");
        let dataset2 = new FlattenedDataset({
          dimensions: [
            {
              name: "Position",
              value: "{Position}",
            },
          ],
          measures: [
            {
              name: "Compensation",
              value: "{Value}",
            },
          ],
          data: {
            path: "/Payscale",
          },
        });

        vizFrame2.setDataset(dataset2);

        vizFrame2.setModel(this._vizFrameModel2);

        let lines2 = this._lineModel2.getData();
        this._tableModel2.setData(
          datamanipulationUtils.populateTableModel(
            this._lineModel2,
            this._vizFrameModel2
          )
        );

        vizFrame2.setVizProperties({
          plotArea: {
            colorPalette: d3.scale.category20().range(),
            referenceLine: {
              line: { valueAxis: lines2 },
              defaultStyle: { size: 3, type: "solid" },
              formatString: formatPattern.SHORTFLOAT_MFD2,
            },
            drawingEffect: "glossy",
            dataPointSize: { min: 10, max: 10 },
            gridline: { visible: true, type: "dash" },
          },
          title: {
            visible: false,
          },
          dataLabel: {
            visible: true,
            showTotal: true,
            style: { color: "black" },
            position: "outside",
          },
          categoryAxis: {
            label: {
              visible: false,
            },
            title: {
              visible: false,
            },
          },
          valueAxis: {
            scale: {
              fixedRange: true,
              minValue: 10000,
              maxValue: 100000,
            },
            label: {
              visible: true,
              formatString: formatPattern.SHORTFLOAT,
            },
            title: {
              visible: false,
            },
          },
        });

        let xAxis2 = new FeedItem({
          uid: "valueAxis",
          type: "Measure",
          values: ["Compensation"],
        });

        let yAxis2 = new FeedItem({
          uid: "categoryAxis",
          type: "Dimension",
          values: ["Position"],
        });

        vizFrame2.addFeed(xAxis2);
        vizFrame2.addFeed(yAxis2);

        console.log("Complete...");
      },

      press: function (oEvent) {
        MessageToast.show("The bullet micro chart is pressed.");
      },
 
      onLiveChange: function () {
        // this.doSomework();
        this._debounce("hello...");
      },

      doSomework: function (arg1) {
        console.log("Key was pressed...", arg1);
        let vizFrame = this.byId("vizFrameBar");
        if (vizFrame) console.log("this is good...");
      },

      debounce: function (fn, delay) {
        let timeoutID;
        console.log("Initial Timeout ID: ", timeoutID);
        return (...args) => {
          console.log("Timeout ID: ", timeoutID);
          if (timeoutID) clearTimeout(timeoutID);
          timeoutID = setTimeout(() => {
            fn(...args);
          }, delay);
        };
      },
    });
  }
);
