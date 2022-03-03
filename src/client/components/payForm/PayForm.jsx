import React, { useState } from "react";
import { Container, makeStyles, TextField } from "@material-ui/core";
import { Modal } from "@material-ui/core";
import { Phone, Person, Mail } from "@material-ui/icons";
import { PaystackButton } from "react-paystack";
import "../../styles.css";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  container: {
    width: 500,
    height: 550,
    backgroundColor: "white",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
    border: 0,
    padding: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    [theme.breakpoints.down("sm")]: {
      width: "80vw",
      height: "80vh",
      padding: "5px",
    },
  },
  item: {
    marginBottom: theme.spacing(5),
    height: theme.spacing(5),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

function PayForm({ setPayFormOpen, price, payFormOpen, onDownload }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(0);

  const classes = useStyles();

  const notifySuccess = () => {
    toast.success("Payment Successfull, Template Will Download Shortly", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const notifyWarn = () => {
    toast.warn("Are You Sure ??", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const LIVE_PUBLIC_KEY = "pk_live_023e55ad2cca13200c6ba4ba59924f98a6c3f542";
  // const TEST_PUBLIC_KEY = "pk_test_412f6a9bc6de7ec6cd012e5dd911f23dbaa3aafa";
  const amount = price * 100;
  const componentProps = {
    email,
    amount,
    metadata: {
      name,
      phone,
    },
    publicKey: LIVE_PUBLIC_KEY,
    text: "Pay Now",
    onSuccess: (e) => {
      notifySuccess();
      onDownload();
    },
    onClose: () => notifyWarn(),
  };

  return (
    <Modal open={payFormOpen}>
      <Container className={classes.container}>
        <form autoComplete='off'>
          <div className={classes.item}>
            <Person />
            <TextField
              id='name'
              label='Name'
              size='small'
              style={{ width: "90%" }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className={classes.item}>
            <Mail />
            <TextField
              id='email'
              label='Email'
              size='small'
              style={{ width: "90%" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={classes.item}>
            <Phone />
            <TextField
              id='phone'
              type={Number}
              label='Phone'
              size='small'
              style={{ width: "90%" }}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </form>

        <PaystackButton className='payBtn' {...componentProps} />

        <button
          onClick={() => {
            setPayFormOpen(false);
          }}
          className='btn'
        >
          Cancel
        </button>
      </Container>
    </Modal>
  );
}

export default PayForm;
