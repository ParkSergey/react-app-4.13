
import Button from '../components/buttons/Buttons.jsx';
import circle from '../assets/images/circle.svg'

function ButtonsDemo() {
  return (
    <>
      <Button variant="outline" size="large">
        Sign In
      </Button>
      <Button variant="filled" size="large" icon={<img src={circle} alt='' />}>
        Text
      </Button>
      <Button variant="liked" size="large">
        Text
      </Button>
      <Button variant='liked'>Text</Button>
      <Button variant='outline'>Text</Button>
      <Button variant='filled'>Text</Button>
    </>
  );
}
export default ButtonsDemo;
