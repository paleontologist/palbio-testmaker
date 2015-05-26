/*jslint browser: true*/
/*global window,$
 */
(function () {
  window.questionCount = 0;
  window.palbioTest = {};

  function createQuestion() {
    var $question = $('#question_tpl').children().clone(),
      qid = 'question-' + window.questionCount,
      $typeSelector;

    $question.attr('id', qid);
    $question.appendTo('#questionscontainer');
    $typeSelector = $('#' + qid).find('select[name=questionType]');

    $('<li><a href="#' + qid + '">Вопрос' + (window.questionCount + 1) + '</a></li>')
      .appendTo('#questionscontainer > ul');

    //Смена типа вопроса - меняются и типы у ответов.
    $typeSelector.change(function () {
      $('#' + qid).find('input[name=isright]').attr('type', $typeSelector.val());
    });
    //Создание варианта ответа.
    $('#' + qid + ' button').click(function () {
      createAnswer(qid, $typeSelector.val());
    });

    if (window.questionCount === 0) {
      $('#questionscontainer').tabs();
      $('#questionListHeader').show();
    }
    $('#questionscontainer').tabs('refresh');
    $('#questionscontainer').tabs({
      active: window.questionCount
    });
    window.questionCount++;
  }

  function createAnswer(parentID, answerType) {
    var $answer = $('#answer_tpl > li').clone();
    $answer.appendTo($('#' + parentID + ' ol'));
    $($answer).find("input[type=radio]")
      .attr('name', "isright")
      .attr('type', answerType);
  }

  $('#add_question_btn').button().click(function () {
    createQuestion();
  });

  function exportTest() {
    var ca, //'ca' for 'current answer'
      rightcount; //количество верных ответов.
    window.palbioTest.name = $('#inputTestname').val();
    window.palbioTest.path = $('#inputPath').val();
    window.palbioTest.question = {};
    for (var i = 0; i < window.questionCount; i++) {
      rightcount = 0
      window.palbioTest.question[i] = {};
      window.palbioTest.question[i].img =
                            $('#question-' + i).find('input[name=img]').val();
      window.palbioTest.question[i].qst =
                            $('#question-' + i).find('input[name=qst]').val();
      window.palbioTest.question[i].type =
                            $('#question-' + i).find('input[name=questionType]').val();
      window.palbioTest.question[i].qst =
                            $('#question-' + i).find('input[name=qst]').val();
      window.palbioTest.question[i].ans = {};
      ca = 0;
      $('#question-' + i).find('ol > li').each(function () {
        var $this = $(this), isright = 0;
        if (window.palbioTest.question[i].type === "radio")
          window.palbioTest.question[i].ans[ca] = $this.find('input[name=answer_text').val();
        else
          if ($this.find('input[name=isright]')[0].checked) {
            isright = 1;
            rightcount++;
          }
          window.palbioTest.question[i].ans[ca] = {
            'title': $this.find('input[name=answer_text]').val(),
            'r':  isright
          }
      });
      window.palbioTest.question[i].rigth = rightcount;
    }
  }
  $('#generate_btn').button().click(function () {
    exportTest();
    $('#result textarea').val(js_beautify(JSON.stringify(window.palbioTest)));
    $('#result').dialog({minWidth: 600}).show();
  })
}());

function exportTest() {
  var ca, //'ca' for 'current answer'
    rightcount; //количество верных ответов.
  window.palbioTest.name = $('#inputTestname').val();
  window.palbioTest.path = $('#inputPath').val();
  window.palbioTest.question = {};
  for (var i = 0; i < window.questionCount; i++) {
    rightcount = 0
    window.palbioTest.question[i] = {};
    window.palbioTest.question[i].img =
                          $('#question-' + i).find('input[name=img]').val();
    window.palbioTest.question[i].qst =
                          $('#question-' + i).find('input[name=qst]').val();
    window.palbioTest.question[i].type =
                          $('#question-' + i).find('[name=questionType]').val();
    window.palbioTest.question[i].qst =
                          $('#question-' + i).find('[name=qst]').val();
    window.palbioTest.question[i].ans = {};
    ca = 0;
    $('#question-' + i).find('ol > li').each(function () {
      var $this = $(this), isright = 0;
      if (window.palbioTest.question[i].type == "radio") {
        window.palbioTest.question[i].ans[ca] = $this.find('input[name=answer_text]').val();
        window.palbioTest.question[i].ans[ca] = {
          'title': $this.find('input[name=answer_text]').val(),
          'r':  isright
        }
        window.palbioTest.question[i].ans[ca] = $this.find('input[name=answer_text]').val();
       } else {
        if ($this.find('input[name=isright]')[0].checked) {
          isright = 1;
          rightcount++;
        }
        window.palbioTest.question[i].ans[ca] = {
          'title': $this.find('input[name=answer_text]').val(),
          'r':  isright
        }
      }
      ca++;
    });
    window.palbioTest.question[i].right = rightcount;
  }
}