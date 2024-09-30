const employees = [
  {
    id: 1,
    name: "ALI HAIDAR",
    designation: "Accountant Cum-Computer Operator",
    mobile: "01711202824",
    img: "/stafs/01. Ali Hadiar.jpg",
    fatherName: "ABDUL HOQUE",
    address: "Baliaghatta, Chowhodditola, Godagari, Rajshahi",
  },
  {
    id: 2,
    name: "MD. ABDUL MOMIN",
    designation: "Office Assistant",
    mobile: "01727250117",
    img: "/stafs/02. Abdul Momin.jpg",
    fatherName: "ZILLAR RAHMAN",
    address: "Baliaghatta, Chowhodditola, Godagari, Rajshahi",
  },
  {
    id: 3,
    name: "MOHD ABUL KASHEM",
    designation: "Librarian",
    mobile: "01748057460",
    img: "/stafs/03 copy. Abul Qasem.jpg",
    fatherName: "MD. BODOR ALI",
    address:
      "Sabdul Biswaser Tola, Debinagar, Chapainawabganj Sadar, Chapainawabganj",
  },
  {
    id: 4,
    name: "MD. ATAUR RAHMAN (BABU)",
    designation: "Mlss",
    mobile: "01712362386",
    img: "/stafs/04. Ataur Rahman Babu.jpg",
    fatherName: "LATE FOZLUR RAHMAN",
    address:
      "Professorpara College Road, Chapainawabganj Sadar, Chapainawabganj",
  },
  {
    id: 5,
    name: "MD. ABDUS SAMAD",
    designation: "Mlss",
    mobile: "01732826938",
    img: "/stafs/05. Abdus Samad.jpg",
    fatherName: "LATE ASKOR ALI",
    address: "Debinagar, Shibganj, Chapainawabganj",
  },
  {
    id: 6,
    name: "MD. MILON",
    designation: "Mlss",
    mobile: "01801335615",
    img: "/stafs/06. Milon Ali.jpg",
    fatherName: "LATE FOZLUR RAHMAN",
    address: "Arambag, Bottolahat, Chapainawabganj Sadar, Chapainawabganj",
  },
  {
    id: 7,
    name: "MD. BADOL",
    designation: "Mlss",
    mobile: "01803498044",
    img: "/stafs/07. Badol Ali.jpg",
    fatherName: "MD. KASED ALI",
    address: "Arambag, Bottolahat, Chapainawabganj Sadar, Chapainawabganj",
  },

  {
    id: 8,
    name: "MD. SAGOR",
    designation: "Mlss",
    mobile: "01802905970",
    img: "/stafs/09. Sagor Ali.jpg",
    fatherName: "MD. KASED ALI",
    address: "459, Arambag, Bottolahat, Chapainawabganj Sadar, Chapainawabganj",
  },
  {
    id: 9,
    name: "MD. SABBIR HOSSAIN (EMON)",
    designation: "Mlss",
    mobile: "01758203372",
    img: "/stafs/10. MD. SABBIR HOSSAIN (EMON).jpg",
    fatherName: "MD. MILON",
    address: "Arambag, Bottolahat, Chapainawabganj Sadar, Chapainawabganj",
  },
  {
    id: 10,
    name: "MD. NURUL ISLAM SAHIN",
    designation: "Night Guard",
    mobile: "01740586550",
    img: "/stafs/08. Shahin Ali.jpg",
    fatherName: "MD. DURUL HODA",
    address: "Professorpara, Chapainawabganj Sadar, Chapainawabganj",
  },
  {
    id: 11,
    name: "SREE POLASH JAMADER",
    designation: "Sweeper",
    mobile: "01710139979",
    img: "/stafs/12. Shree Polash Jemeder.jpg",
    fatherName: "LATE SAM JAMADER",
    address: "Lakherajpara, Chapainawabganj Sadar, Chapainawabganj",
  },
  {
    id: 12,
    name: "SRIMOTI MINOTI RANI",
    designation: "Sweeper",
    mobile: "01762483716",
    img: "/stafs/13. Shreemoti Minoti Rani.jpg",
    fatherName: "SHREE BABU SARKER",
    address: "Lakherajpara, Chapainawabganj Sadar, Chapainawabganj",
  },
  {
    id: 13,
    name: "SHREE SRIDOY SAHA",
    designation: "Sweeper",
    mobile: "01709505834",
    img: "/stafs/14. RIDOY SHAHA.jpg",
    fatherName: "SREE POLASH JAMADER",
    address: "Lakherajpara, Chapainawabganj Sadar, Chapainawabganj",
  },
];

export default function handler(req, res) {
  const { employeeId } = req.query;

  if (employeeId) {
    // Convert employeeId from string to number for comparison
    const employee = employees.find(
      (employee) => employee.id === parseInt(employeeId)
    );

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    return res.status(200).json(employee);
  }

  // Return all data if no employeeId is provided
  res.status(200).json(employees);
}
