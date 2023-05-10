sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/viz/ui5/data/FlattenedDataset",
    "sap/viz/ui5/controls/common/feeds/FeedItem",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel, MessageToast, FlattenedDataset, FeedItem) {
    "use strict";

    return Controller.extend("com.sap.vizframe.controller.Main", {
      onInit: function () {
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
        vizFrame.setModel(this.getOwnerComponent().getModel("vizFrameModel"));

        let lines = [
          {
            value: 6000,
            visible: true,
            color: "sapUiNegativeElement",
            label: {
              text: "Low Performance",
              visible: true,
              background: "sapUiNegativeElement",
            },
          },
          {
            value: 25100,
            visible: true,
            color: "sapUiCriticalElement",
            label: {
              text: "Medium Performance",
              visible: true,
              background: "sapUiCriticalElement",
            },
          },
          {
            value: 75000,
            visible: true,
            color: "sapUiPositiveElement",
            label: {
              text: "High Performance",
              visible: true,
              background: "sapUiPositiveElement",
            },
          },
        ];

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

        console.log("Complete...");
      },

      press: function (oEvent) {
        MessageToast.show("The bullet micro chart is pressed.");
      },
    });
  }
);
