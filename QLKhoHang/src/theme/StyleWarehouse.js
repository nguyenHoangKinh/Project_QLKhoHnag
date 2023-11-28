import { StyleSheet } from "react-native";
const StyleWarehouse = StyleSheet.create({
  warehouse_view: {
    backgroundColor: "#fff",
    borderRadius: 20,
    borderColor: "#000",
    borderStyle: "solid",
    borderWidth: 2,
    paddingHorizontal: 6,
    paddingVertical: 8,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
  tittle_warehouse: {
    color: "#06bcee",
    fontSize: 18,
    fontWeight: "600",
    flex: 1,
  },
  detail_warehouse: {
    alignSelf: "center",
    color: "#06bcee",
    fontSize: 30,
    fontWeight: "900",
    flex: 1,
    marginTop: 30,
  },
  name_warehouse: {
    color: "#000",
    fontSize: 18,
    fontWeight: "600",
    flex: 1,
    paddingRight: -100
  },
  btn_add: {
    backgroundColor: "#000",
    borderRadius: 6,
    paddingVertical: 12,
    marginVertical: 34,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
  search: {
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});
export default StyleWarehouse;
