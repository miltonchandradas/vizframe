sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/viz/ui5/data/FlattenedDataset",
    "sap/viz/ui5/controls/common/feeds/FeedItem",
    "com/sap/vizframe/utils/datamanipulationUtils",
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
    datamanipulationUtils
  ) {
    "use strict";

    return Controller.extend("com.sap.vizframe.controller.Main", {
      onInit: function () {
        this._vizFrameModel =
          this.getOwnerComponent().getModel("vizFrameModel");
        this._lineModel = this.getOwnerComponent().getModel("lineModel");
        this._tableModel = this.getOwnerComponent().getModel("tableModel");
        this._vizFrameModel2 =
          this.getOwnerComponent().getModel("vizFrameModel2");
        this._lineModel2 = this.getOwnerComponent().getModel("lineModel2");
        this._tableModel2 = this.getOwnerComponent().getModel("tableModel2");

        let vizFrame = this.byId("vizFrameBar");
        let dataset = new FlattenedDataset({
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
          plotArea: {
            colorPalette: d3.scale.category20().range(),
            referenceLine: {
              line: { valueAxis: lines },
            },
            drawingEffect: "glossy",
          },
          title: {
            visible: false,
          },
          dataLabel: { visible: true, showTotal: true },
        });

        let xAxis = new FeedItem({
          uid: "valueAxis",
          type: "Measure",
          values: ["Compensation"],
        });

        let yAxis = new FeedItem({
          uid: "categoryAxis",
          type: "Dimension",
          values: ["Position"],
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
            },
            drawingEffect: "glossy",
          },
          title: {
            visible: false,
          },
          dataLabel: { visible: true, showTotal: true },
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

      
    });
  }
);
