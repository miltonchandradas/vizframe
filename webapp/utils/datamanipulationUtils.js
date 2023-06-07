sap.ui.define([], function () {
  "use strict";

  return {
    populateTableModel: function (lineModel, vizFrameModel) {
      let rows = [];
      let lines = lineModel.getData();

      vizFrameModel.getData().Payscale.forEach((payscale) => {
        let entry = {
          position: payscale.Position,
          compensation: payscale.Value,
          minRange: lines[0].value,
          current: lines[1].value,
          recentHires: lines[2].value,
          referencePoint: lines[3].value,
          // maxRange: lines[4].value,
        };

        rows.push(entry);
      });

      return { jobDetails: rows };
    },
  };
});
