import { ErrorMessage } from '@hookform/error-message';
import { React, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { AssessmentService } from '../../services/AssessmentService';
import '../../scss/formStyles.scss';

function riskLevel_color(p_score) {
  switch (true) {
    case p_score <= 1:
      return `riskLevel_low bkClExclude1`;
    case p_score <= 3 &&
         p_score >= 1:
      return `riskLevel_medium bkClExclude1`;
    case p_score <= 5 &&
      p_score >= 4:
      return `riskLevel_high bkClExclude1`;
    default:
      return `riskLevel_low bkClExclude1`;
  }
}
function riskLevel_text(p_score) {
  switch (true) {
    case p_score <= 1:
      return `Low`;
    case p_score <= 3 &&
      p_score >= 1:
      return `Medium`;
    case p_score <= 5 &&
      p_score >= 4:
      return `High`;
    default:
      return `Low`;
  }
}
function sum(obj) {
  let objSum = 0;
  for (const el in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, el)) {
      objSum += parseFloat(obj[el]);
    }
  }
  return objSum;
}
function popupSnack() {
  const x = document.getElementById(`snackbar`);
  x.className = `show`;
  setTimeout(() => { x.className = x.className.replace(`show`, ``); }, 3000);
}

export const NewAssessment = () => {
  // create a form that utilizes the "onSubmit" function to send data to
  // packages/client/src/services/AssessmentService.js and then onto the packages/api/src/routes/assessment express API
  const { formState: { errors }, handleSubmit, register, reset, watch } = useForm({
    defaultValues: {
      responses: [ 0, 0, 0, 0, 0 ],
      riskLevel: `Low`,
      score: 0,
    },
  });

  const vibeCheck = watch();

  const [ scoreRender, setScoreRender ] = useState(`score`);
  const [ levelRender, setLevelRender ] = useState(`score`);

  useEffect(() => {
    setScoreRender(sum(vibeCheck.responses));
    vibeCheck.score = scoreRender;
    setLevelRender(riskLevel_text(vibeCheck.score));

  }, [ scoreRender, vibeCheck ]);

  const onSubmit = async (data) => {
    data.instrumentID = 1;
    data.instrumentType = `Behavioral`;
    data.riskLevel = levelRender;
    data.score = scoreRender;
    await AssessmentService.submit(data);
    reset();
    popupSnack();
  };
  return <Form className="flexColumn"
    onSubmit={handleSubmit(onSubmit)}
  >
    <div id="snackbar">Successfully submitted!</div>

    <div className="formTitle">
      <h1>Cat Behavioral Instrument</h1>
      <hr />
    </div>

    <div className="formSection">
      <h4>Cat Details</h4>
      <div className="response">
        <label >
          Cat Name:
          <br />
          <input
            type="text"
            className="input_wide"
            {...register(`catName`, { maxLength: 50, required: `This field is required` })}
          />
          <ErrorMessage
            errors={errors}
            name="catName"
            render={({ message }) => <p
              className="error_message">{message}</p>}
          />
        </label>
      </div>
      <div className="response">
        <label>
          Cat Date of Birth:
          <br />
          <input type="date" className="input_wide"
            {...register(`catDateOfBirth`, { required: `This field is required` })} />
          <ErrorMessage
            errors={errors}
            name="catDateOfBirth"
            render={({ message }) => <p
              className="error_message">{message}</p>}
          />
        </label>
      </div>

    </div>

    <div className="formSection flexColumn">
      <div className="formHeader_row bkClExclude1">
        <div className="questionTitle bkClExclude1">
          <h4>Questions & Responses</h4>
        </div>
        <div id="scoreBoard" className={riskLevel_color(scoreRender)}>
          Score:
          {scoreRender}
          | Risk Level:
          {levelRender}
        </div>
      </div>
      <div className="formQuestions flexColumn">
        <div>
          1. Previous contact with the Cat Judicial System
          <br />
          <ErrorMessage
            errors={errors}
            name="responses[0]"
            render={({ message }) => <p
              className="error_message">{message}</p>}
          />
          <input
            {...register(`responses[0]`, { required: `This field is required` })}
            id="r1"
            type="radio"
            stylename="q1"
            value="0"
          />
          <label htmlFor="r1">
            No - 0
          </label>
          <input
            {...register(`responses[0]`, { required: `This field is required` })}
            id="r2"
            type="radio"
            stylename="q1"
            value="1" />
          <label htmlFor="r2">
            Yes - 1
          </label>
        </div>
        <div>
          2. Physical altercations with other cats
          <br />
          <ErrorMessage
            errors={errors}
            name="responses[1]"
            render={({ message }) => <p
              className="error_message">{message}</p>}
          />
          <input
            {...register(`responses[1]`, { required: `This field is required` })}
            id="r3"
            type="radio"
            stylename="q2"
            value="0"
          />
          <label htmlFor="r3">
            0-3 altercations - 0
          </label>
          <input
            {...register(`responses[1]`, { required: `This field is required` })}
            id="r4"
            type="radio"
            stylename="q2"
            value="1" />
          <label htmlFor="r4">
            3+ altercations - 1
          </label>

        </div>
        <div>
          3. Physical altercations with owner (scratching, biting, etc...)
          <br />
          <ErrorMessage
            errors={errors}
            name="responses[2]"
            render={({ message }) => <p
              className="error_message">{message}</p>}
          />
          <input
            {...register(`responses[2]`, { required: `This field is required` })}
            id="r6"
            type="radio"
            stylename="q3"
            value="0" />
          <label htmlFor="r6">
            0-10 altercations - 0
          </label>
          <input
            {...register(`responses[2]`, { required: `This field is required` })}
            id="r5"
            type="radio"
            stylename="q3"
            value="1"
          />
          <label htmlFor="r5">
            10+ altercations - 1
          </label>

        </div>
        <div>
          4. Plays well with dogs
          <br />
          <ErrorMessage
            errors={errors}
            name="responses[3]"
            render={({ message }) => <p
              className="error_message">{message}</p>}
          />
          <input
            {...register(`responses[3]`, { required: `This field is required` })}
            id="r8"
            type="radio"
            stylename="q4"
            value="0"
          />
          <label htmlFor="r8">
            Yes - 0
          </label>
          <input
            {...register(`responses[3]`, { required: `This field is required` })}
            id="r7"
            type="radio"
            stylename="q4"
            value="1" />
          <label htmlFor="r7">
            No - 1
          </label>

        </div>
        <div>
          5. Hisses at strangers
          <br />
          <ErrorMessage
            errors={errors}
            name="responses[4]"
            render={({ message }) => <p
              className="error_message">{message}</p>}
          />
          <input
            {...register(`responses[4]`, { required: `This field is required` })}
            id="r9"
            type="radio"
            stylename="q5"
            value="0"
          />
          <label htmlFor="r9">
            No - 0
          </label>
          <input
            {...register(`responses[4]`, { required: `This field is required` })}
            id="r10"
            type="radio"
            stylename="q5"
            value="1" />
          <label htmlFor="r10">
            Yes - 1
          </label>
        </div>
      </div>

    </div>

    <Button variant="primary" type="submit">Submit</Button>
  </Form>;

};
