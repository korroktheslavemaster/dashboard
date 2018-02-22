import linkifyHtml from "linkifyjs/html";
import chrono from "chrono-node";

var buildCalendarEvent = (parsedEvent, title) => {
  let base_url = "https://calendar.google.com/calendar/render?action=TEMPLATE&";
  let params =
    "dates=" + parsedEvent.start.moment().format("YYYYMMDD[T]HHmmss[Z]");
  if (parsedEvent.hasOwnProperty("end")) {
    params += "/" + parsedEvent.end.moment().format("YYYYMMDD[T]HHmmss[Z]");
  }
  params += "&&";
  params += "text=" + encodeURIComponent(title);
  return base_url + params;
};

var parseDateFromText = (textToParse, title) => {
  let offset = 0;
  const defaultTags = {
    opening: "<a class='tooltip'>",
    closing: "<span class='tooltiptext'>Add to calendar</span></a>"
  };
  const parseResult = chrono.parse(textToParse);
  for (var i = 0; i < parseResult.length; ++i) {
    const result = parseResult[i];
    const eventLink = buildCalendarEvent(result, title);
    const tagsToAdd = defaultTags;
    tagsToAdd.opening =
      tagsToAdd.opening.slice(0, 3) +
      "href='" +
      eventLink +
      "' target='_blank' " +
      tagsToAdd.opening.slice(3);
    textToParse =
      textToParse.slice(0, result.index + offset) +
      tagsToAdd.opening +
      textToParse.slice(result.index + offset);
    offset += tagsToAdd.opening.length;
    textToParse =
      textToParse.slice(0, result.index + result.text.length + offset) +
      tagsToAdd.closing +
      textToParse.slice(result.index + result.text.length + offset);
    offset += tagsToAdd.closing.length;
  }
  return textToParse;
};

export var getLinkifiedHTML = notice => {
  const { html, title } = notice;
  return linkifyHtml(parseDateFromText(html, title));
};
