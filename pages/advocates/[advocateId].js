// pages/advocates/[advocateId].js
import { useRouter } from "next/router";

export async function getServerSideProps({ params }) {
  const { advocateId } = params;

  const response = await fetch(
    `https://www.chapaibar.com/api/advocates?advocateId=${advocateId}`
  );
  const advocate = await response.json();

  if (!advocate || advocate.error) {
    return {
      notFound: true, // Will trigger a 404 page if advocate is not found
    };
  }

  return {
    props: {
      advocate,
    },
  };
}

export default function AdvocateDetails({ advocate }) {
  const router = useRouter();

  // Optional: Handle navigation and loading state
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.photoContainer}>
        <img
          src={advocate.photo}
          alt={`${advocate.name}'s photo`}
          style={styles.photo}
        />
      </div>
      <div style={styles.detailsContainer}>
        <h1 style={styles.title}>{advocate.name}</h1>
        <p style={styles.detail}>
          <strong>BBC Sanad No:</strong> {advocate.bbcSanadNo}
        </p>
        <p style={styles.detail}>
          <strong>Mobile Number:</strong> {advocate.mobileNumber}
        </p>
        <p style={styles.detail}>
          <strong>Father's Name:</strong> {advocate.fatherName}
        </p>
        <p style={styles.detail}>
          <strong>Address:</strong> {advocate.address}
        </p>
        <p style={styles.detail}>
          <strong>Date of Joining:</strong> {advocate.dateofJoining}
        </p>
        <p style={styles.detail}>
          <strong>Date of Enrollment:</strong> {advocate.dateofEnrollment}
        </p>
        <button style={styles.backButton} onClick={() => router.back()}>
          Back to list
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  photoContainer: {
    marginBottom: "20px",
  },
  photo: {
    width: "100%",
    maxWidth: "300px",
    borderRadius: "8px",
  },
  detailsContainer: {
    width: "100%",
  },
  title: {
    fontSize: "2em",
    marginBottom: "10px",
  },
  detail: {
    fontSize: "1.1em",
    margin: "10px 0",
  },
  backButton: {
    marginTop: "20px",
    padding: "10px 20px",
    fontSize: "1em",
    backgroundColor: "#0070f3",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

// CSS media queries for responsiveness
const mediaStyles = `
    @media (max-width: 600px) {
      .container {
        padding: 10px;
      }
      .title {
        font-size: 1.5em;
      }
      .photo {
        max-width: 100%;
      }
      .backButton {
        width: 100%;
        padding: 12px 0;
      }
    }
  `;
