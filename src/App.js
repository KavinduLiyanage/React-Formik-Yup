import './App.css';
import {Form, Formik, useField} from 'formik';
import * as Yup from 'yup';

const CustomTextInput = ({ lable, ...props}) => {
  const [field, meta] = useField(props);

  return (
    <>
      <lable htmlFor={props.id || props.name}>{lable}</lable>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  )
}

const CustomCheckBox = ({ children, ...props}) => {
  const [field, meta] = useField(props, 'checkbox');

  return (
    <>
      <lable className="checkbox">
        <input type="checkbox" {...field} {...props} />
        {children}
      </lable>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  )
}

const CustomSelect = ({ lable, ...props}) => {
  const [field, meta] = useField(props);

  return (
    <>
      <lable htmlFor={props.id || props.name}>{lable}</lable>
      <select {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  )
}

function App() {
  return (
    <Formik
    initialValues = {{
      name: '',
      email: '',
      acceptedTerms: false,
      specialPower:'',
    }}
    validationSchema={Yup.object({
      name: Yup.string()
        .min(3,'Must be at leat 3 characters')
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
      acceptedTerms: Yup.boolean()
        .required('Required')
        .oneOf([true], 'You must accept the term and conditions'),
      specialPower: Yup.string()
        .oneOf(['flight','invisibility', 'wealthy bat guy', 'other'], 'Invalid Special Power')
        .required('Required')
    })}
    onSubmit={(values, {setSubmitting, resetForm}) => {
      setTimeout(() =>{
        alert(JSON.stringify(values, null, 2));
        resetForm();
        setSubmitting(false);
      }, 3000)
    }}
    >
      {props => (
        <Form>
        <h1>Sign Up</h1>
        <CustomTextInput lable="Name" name="name" type="text" placeholder="Kavindu"/>
        <CustomTextInput lable="Email" name="email" type="email" placeholder="Sandeepa8956@gmail.com"/>
        <CustomSelect lable="Special Power" name="specialPower">
          <option value="">Select a Special Power</option>
          <option value="flight">flight</option>
          <option value="invisibility">invisibility</option>
          <option value="wealthy bat guy">wealthy bat guy</option>
          <option value="other">other</option>
        </CustomSelect>
        <CustomCheckBox name="acceptedTerms">
          I accept the term and conditions
        </CustomCheckBox>
      <button type="submit">{props.isSubmitting ? 'Loading...' : 'Submit'}</button>
      </Form>
      )}

    </Formik>
  );
}

export default App;
