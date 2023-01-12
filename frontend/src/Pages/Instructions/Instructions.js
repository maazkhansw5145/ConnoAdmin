import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import url from "../../Config/URL";
import InstructionsCard from "../../components/InstructionsCard";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";

function Instructions(props) {
  const [instructions, setInstructions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [instructionsType, setInstructionsType] = useState("premium");

  useEffect(() => {
    if (props.auth.msg !== "Login Successfully") {
      props.history.push("/");
    } else if (props.auth.token) {
      getInstructions();
    }
  }, [props.auth, instructionsType]);

  const getInstructions = async () => {
    // let token = await JSON.parse(window.localStorage.getItem("persist:auth"))
    //   .token;
    fetch(`${url}/instructions/${instructionsType}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      console.log("LOGIN Response", res);
      if (res.status === 200) {
        res.json().then((instructions) => {
          setInstructions(instructions);
          setLoading(false);
        });
      }
    });
  };

  const deleteInstruction = async (id) => {
    let token = await JSON.parse(window.localStorage.getItem("persist:auth"))
      .token;
    fetch(`${url}/instructions/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.status === 200) {
        toast.success("Instructions Delete Successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        getInstructions();
      }
    });
  };

  const orderUp = (order) => {
    console.log("ORDER", order);
    fetch(`${url}/instructions/order/up/${instructionsType}/${order}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(() => {
      toast.success("Instructions Moved Upwards", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setLoading(true);
      getInstructions();
    });
  };

  const orderDown = (order) => {
    console.log(order);
    fetch(`${url}/instructions/order/down/${instructionsType}/${order}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((res) => {
      toast.success("Instructions Moved Downwards", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setLoading(true);
      getInstructions();
    });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <div style={{ display: "flex", margin: 15 }}>
        <div style={{ marginLeft: "auto" }}>
          <select
            id="types"
            value={instructionsType}
            onChange={(e) => setInstructionsType(e.target.value)}
            style={{ padding: "10px 20px", borderRadius: 10 }}
          >
            <option value="premium">Premium</option>
            <option value="non-premium">Non Premium</option>
          </select>
        </div>
        <div style={{ marginLeft: "auto" }}>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px 25px",
              borderRadius: 10,
              background: "cornflowerblue",
              borderWidth: 0,
              color: "white",
              boxShadow: "0px 0px 3px 0px rgba(0,0,0,0.75)",
              cursor: "pointer",
            }}
            onClick={() => props.history.push("/add/instructions")}
          >
            <AddIcon /> &nbsp; Add Instructions
          </button>
        </div>
      </div>

      {instructions.length === 0 ? (
        <div
          style={{
            width: 600,
            background: "aliceblue",
            padding: 50,
            borderRadius: 20,
            margin: "111px auto",
          }}
        >
          <h2>
            Currently there are no instructions, Click on the top right{" "}
            <span style={{ color: "cornflowerblue" }}>"Add Instructions"</span>
            button to add one.
          </h2>
        </div>
      ) : (
        <div
          style={{
            boxShadow: "0px 0px 3px 0px rgba(0,0,0,0.75)",
            padding: 8,
            borderRadius: 10,
            width: 580,
            margin: "20px auto",
          }}
        >
          <h3 style={{ textAlign: "start", marginLeft: 15 }}>
            Following are the instructions
          </h3>
          <hr style={{ margin: "25px 0" }} />
          {instructions.map((instruction, index) => {
            console.log(index + 1, instructions.length);
            return (
              <InstructionsCard
                {...props}
                instructions={instruction}
                deleteInstruction={deleteInstruction}
                key={index}
                last={index + 1 === instructions.length}
                orderUp={orderUp}
                orderDown={orderDown}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Instructions);
