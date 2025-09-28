class Online
{
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
}

Online.run();
