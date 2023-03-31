import { Form, Formik } from "formik";
import { SyntheticEvent, useContext } from "react";
import { UserContext } from "../../context/UserProvider";
import { TicketsContextType, UserContextType } from "../../types";
import { Categories } from "./Categories";
import { SelectOptions } from "../shared/SelectOptions";
import { TextArea } from "../shared/TextArea";
import { TextField } from "../shared/TextField";
import { validationSchema } from "./ValidationSchema";
import "./AddTicketForm.css";
import { ITicket } from "../../interfaces/interface";
import { TicketsContext } from "../../context/TicketsProvider";
import { useNavigate } from "react-router-dom";
import { Urgency } from "./Urgency";

export const AddTicketForm = () => {
  const navigate = useNavigate();
  const { dbUser } = useContext(UserContext) as UserContextType;
  const { postingTicket } = useContext(TicketsContext) as TicketsContextType
  const initialValues = {
    title: "",
    description: "",
    timeEstimate: "XS",
    urgency: 0,
    categoryNames: [],
    userId: dbUser?.userId,
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values , {setSubmitting} ) => {
        setSubmitting(false);
        postingTicket( values as Partial<ITicket> )
        navigate('/');
      }}
      validationSchema={validationSchema}
    >
      <div className="form-background">
        <Form className="ticket-form">
          <h2 className="ticket-form__title">Add a ticket</h2>
          <TextField
            label="Title"
            name="title"
            type="text"
            placeholder="Title.."
          />
          <SelectOptions label="Time Estimate" name="timeEstimate">
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </SelectOptions>
          <TextArea
            label="Description"
            name="description"
            rows={6}
            placeholder="Some more info.."
          />
          {/* <SelectOptions label="Urgency" name="urgency">
            <option value={0}>0</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
          </SelectOptions> */}
          <Urgency label="Urgency" name="urgency" />
          <Categories label="Categories"/>
          <button className="btn btn--blue w-100 ticket-form__submit-btn" type="submit">
            Submit
          </button>
        </Form>
      </div>
    </Formik>
  );
};
