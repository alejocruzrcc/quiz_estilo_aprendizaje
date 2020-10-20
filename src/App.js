import React, { Component } from 'react';
import quizQuestions from './api/quizQuestions';
import Quiz from './components/Quiz';
import Result from './components/Result';
import logo from './svg/logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      questionId: 1,
      question: '',
      questiontype: '',
      answerOptions: [],
      answer: [],
      answersCount: {},
      result: {}
    };

    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    this.handleAnswerButton = this.handleAnswerButton.bind(this);
  }

  componentDidMount() {
    const shuffledAnswerOptions = quizQuestions.map(question =>
      this.shuffleArray(question.answers)
    );
    this.setState({
      question: quizQuestions[0].question,
      questiontype: quizQuestions[0].questiontype,
      answerOptions: shuffledAnswerOptions[0]
    });
  }

  shuffleArray(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  
  handleAnswerSelected(event) { 
    this.setUserAnswer(event.currentTarget.value, event.currentTarget.checked);
  }

  handleAnswerButton() {
    if (this.state.questionId < quizQuestions.length) {
      setTimeout(() => this.setNextQuestion(), 300);
    } else {
      setTimeout(() => this.setResults(this.getResults()), 300);
    }
  }

  setUserAnswer(answer, isChecked) {
    if(isChecked){
      this.setState((state, props) => ({
        answersCount: {
          ...state.answersCount,
          [answer]: (state.answersCount[answer] || 0) + 1
        },
        answer: [...this.state.answer, answer]
      }));
    }
    else{
      this.setState((state, props) => ({
        answersCount: {
          ...state.answersCount,
          [answer]: (state.answersCount[answer] || 0) - 1
        },
        answer: this.state.answer.filter(item => item !== answer)
      }));
    }

  }

  setNextQuestion() {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;

    this.setState({
      counter: counter,
      questionId: questionId,
      question: quizQuestions[counter].question,
      answerOptions: quizQuestions[counter].answers,
      answer: ''
    });
  }

  getResults() {
    const answersCount = this.state.answersCount;
    const answersCountKeys = Object.keys(answersCount);
    const answersCountValues = answersCountKeys.map(key => answersCount[key]);
    //const maxAnswerCount = Math.max.apply(null, answersCountValues);
    const total = answersCountValues.reduce((a,b) => a+b, 0)
    answersCountKeys.map(key =>
      answersCount[key] = answersCount[key]* 100 / total
      );
    return answersCount
  }

  setResults(result) {
    this.setState({ result: result });
  }

  renderQuiz() {
    return (
      <Quiz
        answer={this.state.answer}
        answerOptions={this.state.answerOptions}
        checkedItems = {this.state.checkedItems}
        questionId={this.state.questionId}
        question={this.state.question}
        questionTotal={quizQuestions.length}
        onAnswerSelected={this.handleAnswerSelected}
        onAnswerButton = {this.handleAnswerButton}
      />
    );
  }

  renderResult() {
    return <Result quizResult={this.state.result} />;
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Descubriendo mi estilo de aprendizaje</h2>
        </div>
        {Object.keys(this.state.result).length === 0 ? this.renderQuiz() : this.renderResult() }
      </div>
    );
  }
}

export default App;
