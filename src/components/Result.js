import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';

function Result(props) {
  function renderResultOptions(obj) {
    var keys = Object.keys(obj);
    console.log("Keys: ", keys.length)
    var response = [];
    for (var i = 0; i < keys.length; i++) {
      response.push(
        <div>
          <span key={i}> {keys[i]}: </span>
          <span key={keys[i]}> {obj[keys[i]]}</span>
        </div>
      );
    }
    console.log("Response: ", response)
    return response;
  }
  return (
    <CSSTransitionGroup
      className="container result"
      component="div"
      transitionName="fade"
      transitionEnterTimeout={800}
      transitionLeaveTimeout={500}
      transitionAppear
      transitionAppearTimeout={500}
    >
      <div>
        Tu estilo de aprendizaje es:
        {renderResultOptions(props.quizResult)}
      </div>
    </CSSTransitionGroup>
  );
}

Result.propTypes = {
  quizResult: PropTypes.object.isRequired
};

export default Result;
