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
    datamanipulationUtils
  ) {
    "use strict";

    return Controller.extend("com.sap.vizframe.controller.Main", {
      onInit: function () {
        this._vizFrameModel1 =
          this.getOwnerComponent().getModel("vizFrameModel1");
        this._lineModel1 = this.getOwnerComponent().getModel("lineModel1");

        this._vizFrameModel2 =
          this.getOwnerComponent().getModel("vizFrameModel2");
        this._lineModel2 = this.getOwnerComponent().getModel("lineModel2");

        Format.numericFormatter(ChartFormatter.getInstance());
        let formatPattern = ChartFormatter.DefaultPattern;

        let vizFrame1 = this.byId("vizFrameBar1");
        let dataset1 = new FlattenedDataset({
          dimensions: [
            {
              name: "Min Recommended Salary",
              value: "{position}",
            },
          ],
          measures: [
            {
              name: "Min Range",
              value: "{minBarValue}",
            },
            {
              name: "Peer Salary Range",
              value: "{maxBarValue}",
            },
            {
              name: "Peer Bar",
              value: "{peerBarValue}",
            },
          ],
          data: {
            path: "/payscale",
          },
        });

        vizFrame1.setDataset(dataset1);

        vizFrame1.setModel(this._vizFrameModel1);

        let lines = this._lineModel1.getData();

        vizFrame1.setVizProperties({
          legend: { visible: false, maxNumOfItems: 1 },
          plotArea: {
            colorPalette: ["grey", "#427CAC", "#FFFFFF"],
            referenceLine: {
              line: { valueAxis: lines },
              defaultStyle: { size: 3, type: "solid" },
            },
            // drawingEffect: "glossy",
            dataPointSize: { min: 30, max: 30 },
            gridline: { visible: true, type: "dash" },
          },
          title: {
            visible: false,
            text: "Compensation Evaluation Dashboard"
          },
          dataLabel: {
            visible: true,
            showTotal: false,
            formatString: formatPattern.SHORTFLOAT_MFD2,
            style: { color: "black", fontSize: 14 },
            position: "outside",
            hideWhenOverlap: false,
            renderer: (ctx) => {
              console.log(JSON.stringify(ctx));
              // if (ctx.val === 86000) ctx.text = "86k";
              if (ctx.val === 18000) ctx.text = "Peer Salary Range";
              else if (ctx.val === 35000) ctx.text = "Pay Range";
              else ctx.text = "";
            },
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
              minValue: 60000,
              maxValue: 95000,
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
          values: ["Peer Bar", "Peer Salary Range", "Min Range"],
        });

        let yAxis = new FeedItem({
          uid: "categoryAxis",
          type: "Dimension",
          values: ["Min Recommended Salary"],
        });

        vizFrame1.addFeed(xAxis);
        vizFrame1.addFeed(yAxis);
    

        // let vizFrame2 = this.byId("vizFrameBar2");
        // let lines2 = this._lineModel2.getData();
        // let dataset2 = new FlattenedDataset({
        //   dimensions: [
        //     {
        //       name: "Position",
        //       value: "{Position}",
        //     },
        //   ],
        //   measures: [
        //     {
        //       name: "Compensation",
        //       value: "{Value}",
        //     },
        //   ],
        //   data: {
        //     path: "/Payscale",
        //   },
        // });

        // vizFrame2.setDataset(dataset2);

        // vizFrame2.setModel(this._vizFrameModel2);

        // vizFrame2.setVizProperties({
        //   plotArea: {
        //     colorPalette: ["#427CAC"],
        //     referenceLine: {
        //       line: { valueAxis: lines2 },
        //       defaultStyle: { size: 3, type: "solid" },
        //       formatString: formatPattern.SHORTFLOAT_MFD2,
        //     },
        //     // drawingEffect: "glossy",
        //     dataPointSize: { min: 30, max: 30 },
        //     gridline: { visible: true, type: "dash" },
        //   },
        //   title: {
        //     visible: false,
        //   },
        //   dataLabel: {
        //     visible: false,
        //     showTotal: false,
        //     style: { color: "black" },
        //     position: "outside",
        //     renderer: (ctx) => {
        //       console.log(JSON.stringify(ctx));
        //       if (ctx.val === 86000) ctx.text = "86k";
        //       if (ctx.val === 18000) ctx.text = "Peer Salary Range";
        //       if (ctx.val === 125000) ctx.text = "Pay Range";
        //       if (ctx.val === 68000) ctx.text = "";
        //     },
        //   },
        //   categoryAxis: {
        //     label: {
        //       visible: false,
        //     },
        //     title: {
        //       visible: false,
        //     },
        //   },
        //   valueAxis: {
        //     scale: {
        //       fixedRange: true,
        //       minValue: 60000,
        //       maxValue: 95000,
        //     },
        //     label: {
        //       visible: true,
        //       formatString: formatPattern.SHORTFLOAT,
        //     },
        //     title: {
        //       visible: false,
        //     },
        //   },
        // });

        // let xAxis2 = new FeedItem({
        //   uid: "valueAxis",
        //   type: "Measure",
        //   values: ["Compensation"],
        // });

        // let yAxis2 = new FeedItem({
        //   uid: "categoryAxis",
        //   type: "Dimension",
        //   values: ["Position"],
        // });

        // vizFrame2.addFeed(xAxis2);
        // vizFrame2.addFeed(yAxis2);

        console.log("Complete...");
      },

      press: function (oEvent) {
        MessageToast.show("The bullet micro chart is pressed.");
      },
    });
  }
);
