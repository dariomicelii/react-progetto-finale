import EditForm from "../components/EditForm";
import { useParams } from "react-router-dom";

function EditRecord() {
  const { id } = useParams();

  return <EditForm id={id} />;
}

export default EditRecord;
