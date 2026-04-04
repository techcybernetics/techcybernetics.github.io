/* Change this file to get your personal Portfolio */

// Website related settings
const settings = {
  isSplash: false,
};

// SEO Related settings
const seo = {
  title: "Tariq's Portfolio",
  description:
    "Senior Engineering Leader with 15+ years of experience delivering enterprise-scale, cloud-native platforms across financial services. Currently leading multiple engineering teams at JPMorgan Chase, driving platform modernization across multi-region disaster recovery architecture, high availability microservices, and developer infrastructure.",
  og: {
    title: "Tariq Iqbal Portfolio",
    type: "website",
    url: "https://tariqiqbal-portfolio.web.app",
  },
};

// Home Page
const greeting = {
  title: "Tariq Iqbal",
  logo_name: "tariqiqbal",
  nickname: "techcybernetics",
  subTitle:
    "Senior Engineering Leader with 15+ years of experience delivering enterprise-scale, cloud-native platforms. Leading engineering teams at JPMorgan Chase across multi-region disaster recovery, high-availability microservices, and secure open banking infrastructure.",
  resumeLink:
    "https://drive.google.com/file/d/1nYUbOGk2Zhk8KRg_rgNavT6e54rJoTRZ/view?usp=drive_link",
  portfolio_repository:
    "https://github.com/techcybernetics/techcybernetics.github.io",
  githubProfile: "https://github.com/techcybernetics/",
};

const socialMediaLinks = [
  {
    name: "Github",
    link: "https://github.com/techcybernetics/",
    fontAwesomeIcon: "fa-github",
    backgroundColor: "#181717",
  },
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/iqbaltariq/",
    fontAwesomeIcon: "fa-linkedin-in",
    backgroundColor: "#0077B5",
  },
  {
    name: "Gmail",
    link: "mailto:mail.tiqbal@gmail.com",
    fontAwesomeIcon: "fa-google",
    backgroundColor: "#D14836",
  },
];

const skills = {
  data: [
    {
      title: "Engineering Management",
      fileName: "DesignImg",
      skills: [
        "Leading multi-team engineering organizations at JPMorgan Chase responsible for core infrastructure, disaster recovery, and developer platform enablement",
        "Managing and mentoring 20+ engineers — fostering technical excellence, career growth, and high-performing team culture",
        "Partnering with SRE, product, and business stakeholders to define RTO/RPO targets and drive platform resilience improvements",
        "Driving DevOps transformation, CI/CD automation, and agile practices to accelerate delivery and reduce MTTR",
      ],
      softwareSkills: [],
    },
    {
      title: "Backend Developement",
      fileName: "FullStackImg",
      skills: [
        "Designing and scaling cloud-native microservices with Spring Boot and Kafka for high-volume, real-time financial data processing",
        "Delivering FDX-aligned REST APIs secured with OAuth2/JWT for open banking and fintech integrations",
        "Full-stack expertise spanning Java (J2EE), JavaScript (Node.js, React), and frameworks including Spring, Hibernate, and Microservices",
        "Optimizing data processing (S3 tuning, API efficiency) — achieved ~30% improvement in system responsiveness at JPMorgan Chase",
      ],
      softwareSkills: [
        {
          skillName: "Java",
          fontAwesomeClassname: "fa-java",
          style: { color: "#007396" },
        },
        {
          skillName: "Spring Boot",
          fontAwesomeClassname: "simple-icons:springboot",
          style: { color: "#6DB33F" },
        },
        {
          skillName: "JavaScript",
          fontAwesomeClassname: "simple-icons:javascript",
          style: { color: "#F7DF1E" },
        },
        {
          skillName: "ReactJS",
          fontAwesomeClassname: "simple-icons:react",
          style: { color: "#61DAFB" },
        },
        {
          skillName: "NodeJS",
          fontAwesomeClassname: "simple-icons:node-dot-js",
          style: { color: "#339933" },
        },
        {
          skillName: "PostgreSQL",
          fontAwesomeClassname: "simple-icons:postgresql",
          style: { color: "#336791" },
        },
      ],
    },
    {
      title: "Cloud Infra-Architecture",
      fileName: "CloudInfraImg",
      skills: [
        "Architecting scalable hybrid-cloud solutions across on-premises and AWS environments with a focus on high availability and fault tolerance",
        "Defining multi-region disaster recovery architecture and leading resilience testing to meet enterprise RTO/RPO targets",
        "Enhancing observability with Splunk, Dynatrace, and CloudWatch — reducing MTTR and improving system uptime across production workloads",
        "Certified AWS Solutions Architect – Associate (2025); experienced with DynamoDB, S3, CloudWatch, and AWS security services",
      ],
      softwareSkills: [
        {
          skillName: "AWS",
          fontAwesomeClassname: "simple-icons:amazonaws",
          style: { color: "#FF9900" },
        },
        {
          skillName: "Docker",
          fontAwesomeClassname: "simple-icons:docker",
          style: { color: "#1488C6" },
        },
        {
          skillName: "Kubernetes",
          fontAwesomeClassname: "simple-icons:kubernetes",
          style: { color: "#326CE5" },
        },
        {
          skillName: "Firebase",
          fontAwesomeClassname: "simple-icons:firebase",
          style: { color: "#FFCA28" },
        },
      ],
    },
  ],
};

const competitiveSites = {
  competitiveSites: [],
};

const degrees = {
  degrees: [
    {
      title: "New Jersey Institute of Technology",
      subtitle: "M.S. in Computer Science",
      logo_path: "njit.png",
      alt_name: "NJIT",
      duration: "2022 - 2024",
      descriptions: [
        "Completed graduate studies in Computer Science and Artificial Intelligence — covering Machine Learning, Big Data, Cloud Computing, and Data Mining.",
        "Applied coursework directly to engineering leadership and cloud-native platform development at JPMorgan Chase.",
      ],
      website_link: "https://www.njit.edu/",
    },
    {
      title: "West Bengal University of Technology",
      subtitle: "B.Tech. in Electrical Engineering",
      logo_path: "aec.png",
      alt_name: "WBUT",
      duration: "2003 - 2007",
      descriptions: [
        "Pursued studies in Electrical Engineering covering Circuit Design, Power Systems, Signal Processing, and Control Systems.",
        "Foundation in engineering principles that underpins 15+ years of systems thinking and technical leadership.",
      ],
      website_link: "http://aecwb.edu.in/",
    },
  ],
};

const certifications = {
  certifications: [],
};

// Experience Page
const experience = {
  title: "Experience",
  subtitle: "Work",
  description:
    "15+ years delivering enterprise-scale platforms across financial services, e-commerce, and regulated environments. Known for modernizing legacy systems into cloud-native architectures, building high-performing engineering teams, and driving measurable improvements in reliability, performance, and delivery velocity.",
  header_image_path: "experience.svg",
  sections: [
    {
      title: "Work",
      work: true,
      experiences: [
        {
          title: "Senior Engineering Manager (Application Owner), VP",
          company: "JPMorgan Chase — Connected Commerce",
          company_url: "https://chase.com/",
          logo_path: "se.png",
          duration: "Apr 2018 – Present",
          location: "New York, NY",
          description:
            "Leading multiple cross-functional engineering teams responsible for cloud-native microservices, open banking platforms, and disaster recovery architecture. Delivered FDX-aligned REST APIs with OAuth2/JWT for real-time financial data exchange. Architected hybrid-cloud integrations across on-prem and AWS. Managed 20+ engineers, improved system responsiveness by ~30%, and introduced AI-assisted engineering practices to accelerate delivery.",
          color: "#0879bf",
        },
        {
          title: "Software Engineer III",
          company: "Shutterstock Inc.",
          company_url: "https://www.shutterstock.com/",
          logo_path: "se.png",
          duration: "2019 – 2019",
          location: "New York, NY",
          description:
            "Engineered a robust automation framework in Node.js to streamline procurement workflows and accelerate modernization of Shutterstock's technology stack. Conducted end-to-end testing automation via JavaScript, Nock, Puppeteer, and Docker. Built scalable testing solutions on AWS infrastructure.",
          color: "#e0001b",
        },
        {
          title: "Senior Lead Software Engineer, Asset Wealth Management",
          company: "JPMorgan Chase — Digital Wealth Management",
          company_url: "https://chase.com/",
          logo_path: "se.png",
          duration: "2018 – 2019",
          location: "New York, NY",
          description:
            "Spearheaded development of JPMorgan's digital robo-advisory platform in collaboration with third-party vendors. Built microservices with Spring Boot and Kafka for event-driven investment workflows. Led DevOps transformation reducing release times and improving system reliability. Implemented J2EE design patterns (SOA, MVC) with Hibernate and JDBC for optimized backend performance.",
          color: "#0879bf",
        },
        {
          title: "Senior Consultant – CRM",
          company: "Cognizant Technology Solutions",
          company_url: "https://www.cognizant.com/us/en",
          logo_path: "se.png",
          duration: "Feb 2013 – Mar 2018",
          location: "New York / New Jersey / Connecticut",
          description:
            "Delivered engineering consulting across multiple Fortune 500 clients including JPMorgan Chase Asset & Wealth Management, PepsiCo, Starwood Hotels, and AIG. Built Groovy/Java automation frameworks using WebDriver BDD, automating 100+ DWM middleware services. Enacted DevOps practices with Cucumber, JBehave, Jenkins, Jira, and Maven. Earlier engagements at Cognizant India and Mahindra Satyam covering CRM and financial services clients.",
          color: "#9b1578",
        },
      ],
    },
  ],
};

// Contact Page
const contactPageData = {
  contactSection: {
    title: "Contact Me",
    profile_image_path: "animated_ashutosh.png",
    description:
      "I'm always open to discussing engineering challenges, leadership, cloud architecture, or open banking. Reach out via email or connect on LinkedIn.",
  },
  blogSection: {},
  addressSection: {},
  phoneSection: {
    title: "",
    subtitle: "",
  },
};

export {
  settings,
  seo,
  greeting,
  socialMediaLinks,
  skills,
  competitiveSites,
  degrees,
  certifications,
  experience,
  contactPageData,
};
