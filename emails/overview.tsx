import {
    Body,
    Container,
    Head,
    Hr,
    Html,
    Preview,
    Text,
} from "@react-email/components";

type JournzOverviewProps = {
    yesAmount: string;
    noAmount: string;
    totalAmount: string;
    firstName: string;
    month: string;
    year: string;
    travelReimbursement: string;
};

export const JournzOverview = ({
    firstName,
    yesAmount,
    noAmount,
    totalAmount,
    month,
    year,
    travelReimbursement,
}: JournzOverviewProps) => (
    <Html>
        <Head />
        <Preview>
            This is your overview of {month} in {year}. You were at the office{" "}
            {yesAmount}.
        </Preview>
        <Body style={main}>
            <Container style={container}>
                <Text style={logo}>🚆 Journz</Text>
                <Hr style={hr} />
                <Text style={paragraph}>Hello {firstName} 🌟,</Text>
                <Text style={paragraph}>
                    Here&apos;s your dazzling {month} {year} office attendance
                    snapshot! 🗓️
                </Text>
                <ul>
                    <li
                        style={{
                            marginBottom: "10px",
                        }}
                    >
                        Total responses: {totalAmount} 📅
                    </li>
                    <li
                        style={{
                            marginBottom: "10px",
                        }}
                    >
                        Days at the office: {yesAmount} 🏢
                    </li>
                    <li
                        style={{
                            marginBottom: "10px",
                        }}
                    >
                        Days at home: {noAmount} 🏠
                    </li>
                </ul>

                <Text
                    style={{
                        ...paragraph,
                        marginTop: "20px",
                        fontWeight: "bold",
                    }}
                >
                    This means you&apos;ll get a travel reimbursement of €
                    {travelReimbursement} this month! 💸
                </Text>
                <Text style={paragraph}>
                    Thank you for your commitment. Let&apos;s keep this momentum
                    going! 🚀
                </Text>

                <Text style={paragraph}>Cheers,</Text>

                <Text style={paragraph}>The Journz Team 📈🚀</Text>
            </Container>
        </Body>
    </Html>
);

JournzOverview.PreviewProps = {
    yesAmount: "10",
    noAmount: "5",
    totalAmount: "15",
    firstName: "Chris",
    month: "June",
    year: "2021",
    travelReimbursement: "15",
} as JournzOverviewProps;

export default JournzOverview;

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
