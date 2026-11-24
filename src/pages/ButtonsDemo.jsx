import Button from '../components/buttons/Buttons.jsx';
import { useForm } from 'react-hook-form';
import Input from '../components/input/Input.jsx';
import circle from '../assets/images/circle.svg';

function ButtonsDemo() {
  const {
    register,
    formState: { errors },
  } = useForm();
  return (
    <>
      <Input
        name="email"
        type="email"
        placeholder="enter email"
        register={register}
        errors={errors}
        rules={{ required: 'Введите email' }}
      />
      <Button variant="outline" size="large" type='submit'>
        Sign In
      </Button>
      <Button variant="filled" size="large" icon={<img src={circle} alt="" />}>
        Text
      </Button>
      <Button variant="liked" size="large">
        Text
      </Button>
      <Button variant="liked">Text</Button>
      <Button variant="outline">Text</Button>
      <Button variant="filled">Text</Button>
    </>
  );
}
export default ButtonsDemo;
