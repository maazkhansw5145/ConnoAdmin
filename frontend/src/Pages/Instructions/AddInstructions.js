import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import url from "../../Config/URL";
import { toast } from "react-toastify";
import { PhotoCamera } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Loading from "../../components/Loading";

function AddInstructions(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [detailed_description, setDetailedDescription] = useState("");
  const [image, setImage] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [type, setType] = useState("premium");
  const [detailsLink, setDetailsLink] = useState("");

  const [loading, setLoading] = useState(false);
  console.log(type);
  useEffect(() => {
    if (props.auth.msg !== "Login Successfully") {
      props.history.push("/");
    }
  }, [props.auth.msg]);

  const addInstructions = async () => {
    setLoading(true);
    let token = await JSON.parse(window.localStorage.getItem("persist:auth"))
      .token;
    const imageFile = new FormData();
    imageFile.append("image", image);
    console.log(imageFile);
    fetch(`${url}/instructions/image/upload`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: imageFile,
    }).then((res) => {
      res.json().then((imageURL) => {
        console.log(imageURL);
        fetch(`${url}/instructions`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title,
            description,
            detailed_description,
            details_link: detailsLink,
            image: typeof imageURL === String ? imageURL : "",
            type,
          }),
        })
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              toast.success("Instructions Added Successfully", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
              props.history.push("/instructions");
            }
          })
          .catch(() => {
            toast.error("Ooops! Failed to add instructions, try again!", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          });
      });
    });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div
      style={{
        background: "aliceblue",
        width: "50%",
        margin: "13px auto 14px auto",
        padding: 20,
        borderRadius: 30,
      }}
    >
      <h2 style={{ color: "rgb(172 29 29)", marginTop: 0 }}>Add Instructions</h2>
      <div
        style={{
          display: "grid",
          rowGap: 22,
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "end",
            justifyContent: "space-evenly",
          }}
        >
          <input
            accept="image/*"
            id="icon-button-file"
            type="file"
            className="form-input"
            onChange={(e) => {
              var allowedExtensions = /\.(jpg|jpeg|png)$/i;
              if (!allowedExtensions.exec(e.target.files[0].name)) {
                alert(
                  "Invalid file type. Only JPG, JPEG and PNG files are allowed."
                );
              } else {
                setImage(e.target.files[0]);
                setImageURL(URL.createObjectURL(e.target.files[0]));
              }
            }}
            style={{ display: "none" }}
          />
          <label htmlFor="icon-button-file">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera />
            </IconButton>
          </label>
          {image !== "" && (
            <img
              src={imageURL}
              style={{ width: 100, height: 75, borderRadius: 5 }}
              alt="Item"
            />
          )}
        </div>
        <input
          name="title"
          type="text"
          required="true"
          placeholder="Title"
          style={{
            padding: "10px 20px",
            borderRadius: 10,
          }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          name="description"
          type="text"
          required="true"
          placeholder="Description"
          style={{
            padding: "10px 20px",
            borderRadius: 10,
          }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <textarea
          name="detailed_description"
          required="true"
          placeholder="Enter Detailed Description Here"
          style={{
            padding: "10px 20px",
            borderRadius: 10,
          }}
          value={detailed_description}
          onChange={(e) => setDetailedDescription(e.target.value)}
        />
        <div>
          <input
            name="details link"
            type="text"
            placeholder="Details Link"
            style={{
              padding: "10px 20px",
              borderRadius: 10,
            }}
            value={detailsLink}
            onChange={(e) => setDetailsLink(e.target.value)}
          />
          <p
            style={{
              margin: "5px 0 0 0",
              fontStyle: "italic",
              textAlign: "left",
            }}
          >
            * Optional
          </p>
        </div>

        <label for="types">Select Type:</label>
        <select
          id="types"
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={{ padding: "10px 20px", borderRadius: 10 }}
        >
          <option value="premium">Premium</option>
          <option value="non-premium">Non Premium</option>
        </select>
        <button
          onClick={() => addInstructions()}
          disabled={
            title === "" ||
            description === "" ||
            detailed_description === "" ||
            image === ""
          }
          style={{
            padding: "10px 30px",
            borderRadius: 15,
            color:
              title === "" ||
              description === "" ||
              detailed_description === "" ||
              image === ""
                ? "black"
                : "white",
            background:
              title === "" ||
              description === "" ||
              detailed_description === "" ||
              image === ""
                ? "lightgray"
                : "cornflowerblue",
            borderWidth: 0,
            boxShadow: "0px 0px 3px 0px rgba(0,0,0,0.75)",
            cursor:
              (title !== "" ||
                description !== "" ||
                detailed_description !== "" ||
                image === "") &&
              "pointer",
          }}
        >
          Add Instructions
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(AddInstructions);
