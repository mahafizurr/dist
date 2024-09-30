import { useRouter } from "next/router";
export async function getServerSideProps({ params }) {
  const { employeeId } = params;

  const response = await fetch(
    `http://localhost:3000/api/employees?employeeId=${employeeId}`
  );
  const employee = await response.json();

  if (!employee || employee.error) {
    return {
      notFound: true, // Will trigger a 404 page if employee is not found
    };
  }

  return {
    props: {
      employee,
    },
  };
}

export default function Employee({ employee }) {
  const router = useRouter();

  // Optional: Handle navigation and loading state
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.photoContainer}>
        <img
          src={employee.img}
          alt={`${employee.name}'s photo`}
          style={styles.photo}
        />
      </div>
      <div style={styles.detailsContainer}>
        <h1 style={styles.title}>{employee.name}</h1>
        <p style={styles.detail}>
          <strong>Designation:</strong> {employee.designation}
        </p>
        <p style={styles.detail}>
          <strong>Mobile Number:</strong> {employee.mobile}
        </p>
        <p style={styles.detail}>
          <strong>Father's Name:</strong> {employee.fatherName}
        </p>
        <p style={styles.detail}>
          <strong>Address:</strong> {employee.address}
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
