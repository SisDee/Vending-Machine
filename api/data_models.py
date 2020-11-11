import json
import pymongo

#model a product as it is in database
class Product:
	def __init__(self,code,name,price,count):
		self.code = code
		self.name = name.upper()
		self.price = price
		self.count = count

	#string represantation for debugging
	def __str__(self):
		line = str({"code":self.code,"name":self.name,"price":self.price,"count":self.count})
		return line
	
	#just convert this to a map
	def to_map(self):
		m = {"code":self.code,"name":self.name,"price":self.price,"count":self.count}
		return  m


