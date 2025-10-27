class Online
{
  isDark = true;
  static run() {
    document.addEventListener("DOMContentLoaded", function () {
      try {
        let sPublished = document.getElementsByClassName("n-block-footer-published").item(0);
        let sPublishedInnerHTML = sPublished.innerHTML;
        let sDateStart = sPublishedInnerHTML.split("-")[0].trim();
        let sISOStartSplit = sDateStart.split("/");
        let sISOStartDate = sISOStartSplit[2]  + "-" + sISOStartSplit[1] + "-" + sISOStartSplit[0];
        let oDateStart = new Date(sISOStartDate);
        let oDateEnd = new Date(Date.now());
        let weeks = Online.getWeeks(oDateStart, oDateEnd);
        sPublished.innerHTML = sPublishedInnerHTML + "&nbsp;" + "(" + weeks + " weeks ago" + ")";
        Online.themeToggleHandle();
      } catch (exception) {
        console.error("Error", exception.message);
      }
    });
  }

  static getWeeks(start_date, end_date) {
    const oneDay = 1000 * 60 * 60 * 24;
    const oneWeek = oneDay * 7;
    const difference = Math.abs(start_date.getTime() - end_date.getTime());
    return Math.floor(difference / oneWeek);
  }

  static themeToggleHandle() {
    let toggleWidget = document.getElementById("themeToggleWidget");
    let toggleWidgetClassName = null;
    let toggleWidgetContainer = null;
    let themeContainer = document.getElementById("theme-container");
    let htmlTag = document.getElementsByTagName("html")[0];
    let themeClassNameString = null;
    toggleWidget.addEventListener("click", function(e) {
      toggleWidgetContainer = toggleWidget.children[0];
      toggleWidgetClassName = toggleWidgetContainer.className;
      let themeString = null;
      let themeLabelObject = document.getElementById("theme-label");
      if(toggleWidgetClassName.includes("dark")){
        Online.isDark = true;
        themeClassNameString = "light-theme";
        themeString = `theme-toggle-widget-${Online.isDark ? "light" : "dark"}-mode`;
        themeContainer.className = themeString;
        themeLabelObject.innerText = "Light Mode";
        htmlTag.className = themeClassNameString;
      } else {
        Online.isDark = false;
        themeClassNameString = "dark-theme";
        themeString = `theme-toggle-widget-${Online.isDark ? "light" : "dark"}-mode`;
        themeContainer.className = themeString;
        themeLabelObject.innerText = "Dark Mode";
        htmlTag.className = themeClassNameString;
      }
    });
  }

}

Online.run();
