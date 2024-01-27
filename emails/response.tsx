import {
    Body,
    Button,
    Container,
    Head,
    Hr,
    Html,
    Preview,
    Section,
    Text,
} from "@react-email/components";

const baseUrl = process.env.BASE_URL;

type JournzResponseProps = {
    userFirstname: string;
    yesUrl: string;
    noUrl: string;
};

export const JournzResponse = ({
    userFirstname,
    noUrl,
    yesUrl,
}: JournzResponseProps) => (
    <Html>
        <Head />
        <Preview>Are you going to be at the office today?</Preview>
        <Body style={main}>
            <Container style={container}>
                <Text style={logo}>🚆 Journz</Text>
                <Hr style={hr} />
                <Text style={paragraph}>Hello {userFirstname} 👋,</Text>
                <Text style={paragraph}>
                    Checking in for today: Are you planning to be at the office?
                    🏢 Just click Yes or No below. Your input is crucial in
                    helping us tally this month&apos;s office attendance for a
                    comprehensive report. This info is key for processing travel
                    reimbursements and understanding your office presence
                    trends.
                </Text>
                <Text style={paragraph}>
                    <strong>Quick and Easy:</strong>
                </Text>

                <Section style={btnContainer}>
                    <Button style={primaryButton} href={yesUrl}>
                        Yes, I&apos;m in!
                    </Button>
                    <Button
                        style={{
                            ...dangerButton,
                            marginLeft: "10px",
                        }}
                        href={noUrl}
                    >
                        Not today!
                    </Button>
                </Section>

                <Text style={paragraph}>
                    We compile these responses to provide you with a neat
                    summary at the end of the month. Your cooperation is greatly
                    appreciated! 🌟
                </Text>

                <Text style={paragraph}>
                    Cheers,
                    <br />
                    The Journz Team 📈🚀
                </Text>
            </Container>
        </Body>
    </Html>
);

JournzResponse.PreviewProps = {
    userFirstname: "Alan",
    yesUrl: `${baseUrl}/response/yes`,
    noUrl: `${baseUrl}/response/no`,
} as JournzResponseProps;

export default JournzResponse;

const main = {
    backgroundColor: "#ffffff",
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
    margin: "0 auto",
    padding: "20px 0 48px",
};

const logo = {
    fontSize: "22px",
    fontWeight: "bold",
    margin: "0 auto",
};

const paragraph = {
    fontSize: "16px",
    lineHeight: "26px",
};

const btnContainer = {
    margin: "20px 0",
    // add gap between buttons
};

const buttonStyle = {
    borderRadius: "3px",
    color: "#fff",
    fontSize: "16px",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "block",
    padding: "12px",
};

const primaryButton = {
    ...buttonStyle,
    backgroundColor: "#22c55e",
};

const dangerButton = {
    ...buttonStyle,
    backgroundColor: "#f5365c",
};

const hr = {
    borderColor: "#cccccc",
    margin: "20px 0",
};

const footer = {
    color: "#8898aa",
    fontSize: "12px",
};
