export default class Transition {
  static fadeIn(styleObject, timeMilliSec) {
    styleObject['-webkit-transition'] = 'opacity ' + timeMilliSec + 'ms';
    styleObject['-moz-transition'] = 'opacity ' + timeMilliSec + 'ms';
    styleObject['-ms-transition'] = 'opacity ' + timeMilliSec + 'ms';
    styleObject['-o-transition'] = 'opacity ' + timeMilliSec + 'ms';
    styleObject['transition'] = 'opacity ' + timeMilliSec + 'ms'
    styleObject['opacity'] = 1;
  }
  static fadeOut(styleObject, timeMilliSec) {
    styleObject['-webkit-transition'] = 'opacity ' + timeMilliSec + 'ms';
    styleObject['-moz-transition'] = 'opacity ' + timeMilliSec + 'ms';
    styleObject['-ms-transition'] = 'opacity ' + timeMilliSec + 'ms';
    styleObject['-o-transition'] = 'opacity ' + timeMilliSec + 'ms';
    styleObject['transition'] = 'opacity ' + timeMilliSec + 'ms';
    styleObject['opacity'] = 0;
  }
}