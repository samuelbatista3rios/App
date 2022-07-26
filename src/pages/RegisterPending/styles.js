import { StyleSheet } from "react-native";
import { metrics, colors } from "../../styles";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  largeText: {
    fontSize: 20,
    fontWeight: "normal",
    color: "#000",
    marginLeft: metrics.padding
  },
  smallText: {
    fontSize: 15,
    fontWeight: "100",
    color: "#000"
  },
  input: {
    margin: metrics.padding,
    padding: metrics.padding,
    paddingLeft: metrics.padding * 2,
    borderBottomWidth: 1,
    borderBottomColor: colors.black,
    color: colors.black,
    marginBottom: 0
  },
  successCard: {
    alignSelf: "center",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    height: "70%",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  },
  fileUploadContainer: {
    flex: 1,
    backgroundColor: colors.success,
    padding: metrics.padding
  },
  fileUploadButton: {
    backgroundColor: "transparent",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.white,
    marginTop: metrics.margin,
    padding: metrics.padding / 2,
    minHeight: 130
  }
});
