(function() {
  let questions = [
    {
      question: 'How many species of mosquitoes are able to carry zika?',
      choices: [5, 10, 2, 50, 1],
      correctAnswer: 2
    },
    {
      question: 'What is the leading cause of mosquitoes breeding?',
      choices: ['Stagnant water', 'Left out honey', 'Open windows'],
      correctAnswer: 'Stagnant water'
    },
    {
      question: 'Mosquitoes only come out at night?',
      choices: ['True', 'False'],
      correctAnswer: 'False'
    },
    {
      question: 'What is the best way to prevent Zika infection?',
      choices: [
        'Wear protection during sexual intercourse',
        'Dump stagnant water around house',
        'Report mosquito activity',
        'Wear mosquito reppelant'
      ],
      correctAnswer: 'Wear mosquito reppelant'
    }
  ];

  let questionCounter = 0;
  let selections = [];
  let quiz = $('#quiz');

  displayNext();

  $('#next').on('click', function(e) {
    e.preventDefault();

    if (quiz.is(':animated')) {
      return false;
    }
    choose();

    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');
    } else {
      questionCounter++;
      displayNext();
    }
  });

  $('#prev').on('click', function(e) {
    e.preventDefault();

    if (quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });

  $('#start').on('click', function(e) {
    e.preventDefault();

    if (quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });

  $('.button').on('mouseenter', function() {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function() {
    $(this).removeClass('active');
  });

  function createQuestionElement(index) {
    let qElement = $('<div>', { id: 'question' });

    let header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);

    let question = $('<p>').append(questions[index].question);
    qElement.append(question);

    let radioButtons = createRadios(index);
    qElement.append(radioButtons);

    return qElement;
  }

  function createRadios(index) {
    let radioList = $('<ul>');
    let item;
    let input = '';
    for (let i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }

  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }

  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();

      if (questionCounter < questions.length) {
        let nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!isNaN(selections[questionCounter])) {
          $('input[value=' + selections[questionCounter] + ']').prop('checked', true);
        }

        if (questionCounter === 1) {
          $('#prev').show();
        } else if (questionCounter === 0) {
          $('#prev').hide();
          $('#next').show();
        }
      } else {
        let scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }

  function displayScore() {
    let score = $('<p>', { id: 'question' });

    let numCorrect = 0;
    for (let i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }

    score.append(`You got ${numCorrect} questions out of ${questions.length} right!`);
    return score;
  }
})();
