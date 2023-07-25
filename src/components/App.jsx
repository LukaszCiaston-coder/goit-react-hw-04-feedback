import { useState } from 'react';
import { Statistics } from './Statistics/Statistic';
import { Section } from './Section/Section';
import { Notification } from './Notification/Notification';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import './App.css';

export const App = () => {
  const [state, setState] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const changeState = (feedbackType) => {
    setState((prevState) => ({
      ...prevState,
      [feedbackType]: prevState[feedbackType] + 1,
    }));
  };

  const countTotalFeedback = () => {
    const { good, neutral, bad } = state;
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    const { good } = state;
    const total = countTotalFeedback();
    return total ? Math.round((good / total) * 100) : 0;
  };

  return (
    <div className="appContainer">
    <Section title={'Please leave feedback'}>
      <FeedbackOptions
        options={Object.keys(state)}
        onLeaveFeedback={changeState}
      />
      {countTotalFeedback() ? (
        <Statistics
          good={state.good}
          neutral={state.neutral}
          bad={state.bad}
          total={countTotalFeedback()}
          positivePercentage={countPositiveFeedbackPercentage()}
        />
      ) : (
        <Notification message="There is no feedback" />
      )}
      </Section>
    </div>
  );
};
