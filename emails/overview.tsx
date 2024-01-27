import {
    Body,
    Container,
    Head,
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
                <Text style={paragraph}>Hey {firstName},</Text>
                <Text style={paragraph}>
                    This is your overview of {month} in {year}. You were at the
                    office {yesAmount} times and you weren&apos;t at the office{" "}
                    {noAmount} times. In total you were at the office{" "}
                    {totalAmount} times.
                </Text>

                <Text
                    style={{
                        ...paragraph,
                        marginTop: "20px",
                        fontWeight: "bold",
                    }}
                >
                    This means you&apos;ll get a travel reimbursement of €
                    {travelReimbursement}🚀.
                </Text>
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
