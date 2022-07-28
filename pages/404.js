import ErrorImage from "../public/assets/404.png";
import Image from "next/image";
import { Container } from "@mui/system";

const ErrorPage = () => {
  return (
    <Container className="fullSize center">
      <Image src={ErrorImage} alt="404" />
    </Container>
  );
};

export default ErrorPage;
