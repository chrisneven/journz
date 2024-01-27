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
                <Text style={paragraph}>Hey {userFirstname},</Text>
                <Text style={paragraph}>
                    Are you going to be at the office today? We&apos;re trying
                    to figure out how many times you&apos;ll be at the office
                    this month. At the end you&apos;ll get a nice report with
                    all the data. This data you can use to reimburce travel
                    expenses or to see how much you&apos;re at the office.
                </Text>

                <Section style={btnContainer}>
                    <Button style={primaryButton} href={yesUrl}>
                        Yes, I&apos;m going to be at the office
                    </Button>
                    <Button
                        style={{
                            ...dangerButton,
                            marginLeft: "10px",
                        }}
                        href={noUrl}
                    >
                        No, I&apos;m not going to be at the office
                    </Button>
                </Section>

                <Text style={paragraph}>
                    <strong>How does it work?</strong>
                    <br />
                    Every day you&apos;ll get an email with the question if
                    you&apos;re going to be at the office. You can reply to this
                    email with &apos;yes&apos; or &apos;no&apos;. You can also
                    use the button below.
                </Text>

                <Text style={paragraph}>
                    Best,
                    <br />
                    The Journz team
                </Text>
                <Hr style={hr} />
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
