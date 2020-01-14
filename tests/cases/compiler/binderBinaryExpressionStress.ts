var caps = 
'<?xml version="1.0" encoding="UTF-8"?>' +
'<!DOCTYPE WMT_MS_Capabilities SYSTEM "http://demo.boundlessgeo.com/geoserver/schemas/wms/1.1.1/WMS_MS_Capabilities.dtd">' +
'<WMT_MS_Capabilities version="1.1.1" updateSequence="145">' +
'  <Service>' +
'    <Name>OGC:WMS</Name>' +
'    <Title>GeoServer Web Map Service</Title>' +
'    <Abstract>A compliant implementation of WMS 1.1.1 plus most of the SLD 1.0 extension (dynamic styling). Can also generate PDF, SVG, KML, GeoRSS</Abstract>' +
'    <KeywordList>' +
'      <Keyword>WFS</Keyword>' +
'      <Keyword>WMS</Keyword>' +
'      <Keyword>GEOSERVER</Keyword>' +
'    </KeywordList>' +
'    <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://demo.boundlessgeo.com/geoserver/wms"/>' +
'    <ContactInformation>' +
'      <ContactPersonPrimary>' +
'        <ContactPerson>Claudius Ptolomaeus</ContactPerson>' +
'        <ContactOrganization>The ancient geographes INC</ContactOrganization>' +
'      </ContactPersonPrimary>' +
'      <ContactPosition>Chief geographer</ContactPosition>' +
'      <ContactAddress>' +
'        <AddressType>Work</AddressType>' +
'        <Address/>' +
'        <City>Alexandria</City>' +
'        <StateOrProvince/>' +
'        <PostCode/>' +
'        <Country>Egypt</Country>' +
'      </ContactAddress>' +
'      <ContactVoiceTelephone/>' +
'      <ContactFacsimileTelephone/>' +
'      <ContactElectronicMailAddress>claudius.ptolomaeus@gmail.com</ContactElectronicMailAddress>' +
'    </ContactInformation>' +
'    <Fees>NONE</Fees>' +
'    <AccessConstraints>NONE</AccessConstraints>' +
'  </Service>' +
'  <Capability>' +
'    <Request>' +
'      <GetCapabilities>' +
'        <Format>application/vnd.ogc.wms_xml</Format>' +
'        <DCPType>' +
'          <HTTP>' +
'            <Get>' +
'              <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://demo.boundlessgeo.com/geoserver/wms?SERVICE=WMS&amp;"/>' +
'            </Get>' +
'            <Post>' +
'              <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://demo.boundlessgeo.com/geoserver/wms?SERVICE=WMS&amp;"/>' +
'            </Post>' +
'          </HTTP>' +
'        </DCPType>' +
'      </GetCapabilities>' +
'      <GetMap>' +
'        <Format>image/png</Format>' +
'        <Format>application/atom xml</Format>' +
'        <Format>application/atom+xml</Format>' +
'        <Format>application/openlayers</Format>' +
'        <Format>application/pdf</Format>' +
'        <Format>application/rss xml</Format>' +
'        <Format>application/rss+xml</Format>' +
'        <Format>application/vnd.google-earth.kml</Format>' +
'        <Format>application/vnd.google-earth.kml xml</Format>' +
'        <Format>application/vnd.google-earth.kml+xml</Format>' +
'        <Format>application/vnd.google-earth.kmz</Format>' +
'        <Format>application/vnd.google-earth.kmz xml</Format>' +
'        <Format>application/vnd.google-earth.kmz+xml</Format>' +
'        <Format>atom</Format>' +
'        <Format>image/geotiff</Format>' +
'        <Format>image/geotiff8</Format>' +
'        <Format>image/gif</Format>' +
'        <Format>image/jpeg</Format>' +
'        <Format>image/png8</Format>' +
'        <Format>image/svg</Format>' +
'        <Format>image/svg xml</Format>' +
'        <Format>image/svg+xml</Format>' +
'        <Format>image/tiff</Format>' +
'        <Format>image/tiff8</Format>' +
'        <Format>kml</Format>' +
'        <Format>kmz</Format>' +
'        <Format>openlayers</Format>' +
'        <Format>rss</Format>' +
'        <DCPType>' +
'          <HTTP>' +
'            <Get>' +
'              <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://demo.boundlessgeo.com/geoserver/wms?SERVICE=WMS&amp;"/>' +
'            </Get>' +
'          </HTTP>' +
'        </DCPType>' +
'      </GetMap>' +
'      <GetFeatureInfo>' +
'        <Format>text/plain</Format>' +
'        <Format>text/html</Format>' +
'        <Format>application/vnd.ogc.gml</Format>' +
'        <DCPType>' +
'          <HTTP>' +
'            <Get>' +
'              <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://demo.boundlessgeo.com/geoserver/wms?SERVICE=WMS&amp;"/>' +
'            </Get>' +
'            <Post>' +
'              <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://demo.boundlessgeo.com/geoserver/wms?SERVICE=WMS&amp;"/>' +
'            </Post>' +
'          </HTTP>' +
'        </DCPType>' +
'      </GetFeatureInfo>' +
'      <DescribeLayer>' +
'        <Format>application/vnd.ogc.wms_xml</Format>' +
'        <DCPType>' +
'          <HTTP>' +
'            <Get>' +
'              <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://demo.boundlessgeo.com/geoserver/wms?SERVICE=WMS&amp;"/>' +
'            </Get>' +
'          </HTTP>' +
'        </DCPType>' +
'      </DescribeLayer>' +
'      <GetLegendGraphic>' +
'        <Format>image/png</Format>' +
'        <Format>image/jpeg</Format>' +
'        <Format>image/gif</Format>' +
'        <DCPType>' +
'          <HTTP>' +
'            <Get>' +
'              <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://demo.boundlessgeo.com/geoserver/wms?SERVICE=WMS&amp;"/>' +
'            </Get>' +
'          </HTTP>' +
'        </DCPType>' +
'      </GetLegendGraphic>' +
'    </Request>' +
'    <Exception>' +
'      <Format>application/vnd.ogc.se_xml</Format>' +
'    </Exception>' +
'    <UserDefinedSymbolization SupportSLD="1" UserLayer="1" UserStyle="1" RemoteWFS="1"/>' +
'    <Layer>' +
'      <Title>GeoServer Web Map Service</Title>' +
'      <Abstract>A compliant implementation of WMS 1.1.1 plus most of the SLD 1.0 extension (dynamic styling). Can also generate PDF, SVG, KML, GeoRSS</Abstract>' +
'      <!--All supported EPSG projections:-->' +
'      <SRS>EPSG:WGS84(DD)</SRS>' +
'      <SRS>EPSG:2000</SRS>' +
'      <SRS>EPSG:2001</SRS>' +
'      <SRS>EPSG:2002</SRS>' +
'      <SRS>EPSG:2003</SRS>' +
'      <SRS>EPSG:2004</SRS>' +
'      <SRS>EPSG:2005</SRS>' +
'      <SRS>EPSG:2006</SRS>' +
'      <SRS>EPSG:2007</SRS>' +
'      <SRS>EPSG:2008</SRS>' +
'      <SRS>EPSG:2009</SRS>' +
'      <SRS>EPSG:2010</SRS>' +
'      <SRS>EPSG:2011</SRS>' +
'      <SRS>EPSG:2012</SRS>' +
'      <SRS>EPSG:2013</SRS>' +
'      <SRS>EPSG:2014</SRS>' +
'      <SRS>EPSG:2015</SRS>' +
'      <SRS>EPSG:2016</SRS>' +
'      <SRS>EPSG:2017</SRS>' +
'      <SRS>EPSG:2018</SRS>' +
'      <SRS>EPSG:2019</SRS>' +
'      <SRS>EPSG:2020</SRS>' +
'      <SRS>EPSG:2021</SRS>' +
'      <SRS>EPSG:2022</SRS>' +
'      <SRS>EPSG:2023</SRS>' +
'      <SRS>EPSG:2024</SRS>' +
'      <SRS>EPSG:2025</SRS>' +
'      <SRS>EPSG:2026</SRS>' +
'      <SRS>EPSG:2027</SRS>' +
'      <SRS>EPSG:2028</SRS>' +
'      <SRS>EPSG:2029</SRS>' +
'      <SRS>EPSG:2030</SRS>' +
'      <SRS>EPSG:2031</SRS>' +
'      <SRS>EPSG:2032</SRS>' +
'      <SRS>EPSG:2033</SRS>' +
'      <SRS>EPSG:2034</SRS>' +
'      <SRS>EPSG:2035</SRS>' +
'      <SRS>EPSG:2036</SRS>' +
'      <SRS>EPSG:2037</SRS>' +
'      <SRS>EPSG:2038</SRS>' +
'      <SRS>EPSG:2039</SRS>' +
'      <SRS>EPSG:2040</SRS>' +
'      <SRS>EPSG:2041</SRS>' +
'      <SRS>EPSG:2042</SRS>' +
'      <SRS>EPSG:2043</SRS>' +
'      <SRS>EPSG:2044</SRS>' +
'      <SRS>EPSG:2045</SRS>' +
'      <SRS>EPSG:2046</SRS>' +
'      <SRS>EPSG:2047</SRS>' +
'      <SRS>EPSG:2048</SRS>' +
'      <SRS>EPSG:2049</SRS>' +
'      <SRS>EPSG:2050</SRS>' +
'      <SRS>EPSG:2051</SRS>' +
'      <SRS>EPSG:2052</SRS>' +
'      <SRS>EPSG:2053</SRS>' +
'      <SRS>EPSG:2054</SRS>' +
'      <SRS>EPSG:2055</SRS>' +
'      <SRS>EPSG:2056</SRS>' +
'      <SRS>EPSG:2057</SRS>' +
'      <SRS>EPSG:2058</SRS>' +
'      <SRS>EPSG:2059</SRS>' +
'      <SRS>EPSG:2060</SRS>' +
'      <SRS>EPSG:2061</SRS>' +
'      <SRS>EPSG:2062</SRS>' +
'      <SRS>EPSG:2063</SRS>' +
'      <SRS>EPSG:2064</SRS>' +
'      <SRS>EPSG:2065</SRS>' +
'      <SRS>EPSG:2066</SRS>' +
'      <SRS>EPSG:2067</SRS>' +
'      <SRS>EPSG:2068</SRS>' +
'      <SRS>EPSG:2069</SRS>' +
'      <SRS>EPSG:2070</SRS>' +
'      <SRS>EPSG:2071</SRS>' +
'      <SRS>EPSG:2072</SRS>' +
'      <SRS>EPSG:2073</SRS>' +
'      <SRS>EPSG:2074</SRS>' +
'      <SRS>EPSG:2075</SRS>' +
'      <SRS>EPSG:2076</SRS>' +
'      <SRS>EPSG:2077</SRS>' +
'      <SRS>EPSG:2078</SRS>' +
'      <SRS>EPSG:2079</SRS>' +
'      <SRS>EPSG:2080</SRS>' +
'      <SRS>EPSG:2081</SRS>' +
'      <SRS>EPSG:2082</SRS>' +
'      <SRS>EPSG:2083</SRS>' +
'      <SRS>EPSG:2084</SRS>' +
'      <SRS>EPSG:2085</SRS>' +
'      <SRS>EPSG:2086</SRS>' +
'      <SRS>EPSG:2087</SRS>' +
'      <SRS>EPSG:2088</SRS>' +
'      <SRS>EPSG:2089</SRS>' +
'      <SRS>EPSG:2090</SRS>' +
'      <SRS>EPSG:2091</SRS>' +
'      <SRS>EPSG:2092</SRS>' +
'      <SRS>EPSG:2093</SRS>' +
'      <SRS>EPSG:2094</SRS>' +
'      <SRS>EPSG:2095</SRS>' +
'      <SRS>EPSG:2096</SRS>' +
'      <SRS>EPSG:2097</SRS>' +
'      <SRS>EPSG:2098</SRS>' +
'      <SRS>EPSG:2099</SRS>' +
'      <SRS>EPSG:2100</SRS>' +
'      <SRS>EPSG:2101</SRS>' +
'      <SRS>EPSG:2102</SRS>' +
'      <SRS>EPSG:2103</SRS>' +
'      <SRS>EPSG:2104</SRS>' +
'      <SRS>EPSG:2105</SRS>' +
'      <SRS>EPSG:2106</SRS>' +
'      <SRS>EPSG:2107</SRS>' +
'      <SRS>EPSG:2108</SRS>' +
'      <SRS>EPSG:2109</SRS>' +
'      <SRS>EPSG:2110</SRS>' +
'      <SRS>EPSG:2111</SRS>' +
'      <SRS>EPSG:2112</SRS>' +
'      <SRS>EPSG:2113</SRS>' +
'      <SRS>EPSG:2114</SRS>' +
'      <SRS>EPSG:2115</SRS>' +
'      <SRS>EPSG:2116</SRS>' +
'      <SRS>EPSG:2117</SRS>' +
'      <SRS>EPSG:2118</SRS>' +
'      <SRS>EPSG:2119</SRS>' +
'      <SRS>EPSG:2120</SRS>' +
'      <SRS>EPSG:2121</SRS>' +
'      <SRS>EPSG:2122</SRS>' +
'      <SRS>EPSG:2123</SRS>' +
'      <SRS>EPSG:2124</SRS>' +
'      <SRS>EPSG:2125</SRS>' +
'      <SRS>EPSG:2126</SRS>' +
'      <SRS>EPSG:2127</SRS>' +
'      <SRS>EPSG:2128</SRS>' +
'      <SRS>EPSG:2129</SRS>' +
'      <SRS>EPSG:2130</SRS>' +
'      <SRS>EPSG:2131</SRS>' +
'      <SRS>EPSG:2132</SRS>' +
'      <SRS>EPSG:2133</SRS>' +
'      <SRS>EPSG:2134</SRS>' +
'      <SRS>EPSG:2135</SRS>' +
'      <SRS>EPSG:2136</SRS>' +
'      <SRS>EPSG:2137</SRS>' +
'      <SRS>EPSG:2138</SRS>' +
'      <SRS>EPSG:2139</SRS>' +
'      <SRS>EPSG:2140</SRS>' +
'      <SRS>EPSG:2141</SRS>' +
'      <SRS>EPSG:2142</SRS>' +
'      <SRS>EPSG:2143</SRS>' +
'      <SRS>EPSG:2144</SRS>' +
'      <SRS>EPSG:2145</SRS>' +
'      <SRS>EPSG:2146</SRS>' +
'      <SRS>EPSG:2147</SRS>' +
'      <SRS>EPSG:2148</SRS>' +
'      <SRS>EPSG:2149</SRS>' +
'      <SRS>EPSG:2150</SRS>' +
'      <SRS>EPSG:2151</SRS>' +
'      <SRS>EPSG:2152</SRS>' +
'      <SRS>EPSG:2153</SRS>' +
'      <SRS>EPSG:2154</SRS>' +
'      <SRS>EPSG:2155</SRS>' +
'      <SRS>EPSG:2156</SRS>' +
'      <SRS>EPSG:2157</SRS>' +
'      <SRS>EPSG:2158</SRS>' +
'      <SRS>EPSG:2159</SRS>' +
'      <SRS>EPSG:2160</SRS>' +
'      <SRS>EPSG:2161</SRS>' +
'      <SRS>EPSG:2162</SRS>' +
'      <SRS>EPSG:2163</SRS>' +
'      <SRS>EPSG:2164</SRS>' +
'      <SRS>EPSG:2165</SRS>' +
'      <SRS>EPSG:2166</SRS>' +
'      <SRS>EPSG:2167</SRS>' +
'      <SRS>EPSG:2168</SRS>' +
'      <SRS>EPSG:2169</SRS>' +
'      <SRS>EPSG:2170</SRS>' +
'      <SRS>EPSG:2171</SRS>' +
'      <SRS>EPSG:2172</SRS>' +
'      <SRS>EPSG:2173</SRS>' +
'      <SRS>EPSG:2174</SRS>' +
'      <SRS>EPSG:2175</SRS>' +
'      <SRS>EPSG:2176</SRS>' +
'      <SRS>EPSG:2177</SRS>' +
'      <SRS>EPSG:2178</SRS>' +
'      <SRS>EPSG:2179</SRS>' +
'      <SRS>EPSG:2180</SRS>' +
'      <SRS>EPSG:2188</SRS>' +
'      <SRS>EPSG:2189</SRS>' +
'      <SRS>EPSG:2190</SRS>' +
'      <SRS>EPSG:2191</SRS>' +
'      <SRS>EPSG:2192</SRS>' +
'      <SRS>EPSG:2193</SRS>' +
'      <SRS>EPSG:2194</SRS>' +
'      <SRS>EPSG:2195</SRS>' +
'      <SRS>EPSG:2196</SRS>' +
'      <SRS>EPSG:2197</SRS>' +
'      <SRS>EPSG:2198</SRS>' +
'      <SRS>EPSG:2199</SRS>' +
'      <SRS>EPSG:2200</SRS>' +
'      <SRS>EPSG:2201</SRS>' +
'      <SRS>EPSG:2202</SRS>' +
'      <SRS>EPSG:2203</SRS>' +
'      <SRS>EPSG:2204</SRS>' +
'      <SRS>EPSG:2205</SRS>' +
'      <SRS>EPSG:2206</SRS>' +
'      <SRS>EPSG:2207</SRS>' +
'      <SRS>EPSG:2208</SRS>' +
'      <SRS>EPSG:2209</SRS>' +
'      <SRS>EPSG:2210</SRS>' +
'      <SRS>EPSG:2211</SRS>' +
'      <SRS>EPSG:2212</SRS>' +
'      <SRS>EPSG:2213</SRS>' +
'      <SRS>EPSG:2214</SRS>' +
'      <SRS>EPSG:2215</SRS>' +
'      <SRS>EPSG:2216</SRS>' +
'      <SRS>EPSG:2217</SRS>' +
'      <SRS>EPSG:2218</SRS>' +
'      <SRS>EPSG:2219</SRS>' +
'      <SRS>EPSG:2220</SRS>' +
'      <SRS>EPSG:2221</SRS>' +
'      <SRS>EPSG:2222</SRS>' +
'      <SRS>EPSG:2223</SRS>' +
'      <SRS>EPSG:2224</SRS>' +
'      <SRS>EPSG:2225</SRS>' +
'      <SRS>EPSG:2226</SRS>' +
'      <SRS>EPSG:2227</SRS>' +
'      <SRS>EPSG:2228</SRS>' +
'      <SRS>EPSG:2229</SRS>' +
'      <SRS>EPSG:2230</SRS>' +
'      <SRS>EPSG:2231</SRS>' +
'      <SRS>EPSG:2232</SRS>' +
'      <SRS>EPSG:2233</SRS>' +
'      <SRS>EPSG:2234</SRS>' +
'      <SRS>EPSG:2235</SRS>' +
'      <SRS>EPSG:2236</SRS>' +
'      <SRS>EPSG:2237</SRS>' +
'      <SRS>EPSG:2238</SRS>' +
'      <SRS>EPSG:2239</SRS>' +
'      <SRS>EPSG:2240</SRS>' +
'      <SRS>EPSG:2241</SRS>' +
'      <SRS>EPSG:2242</SRS>' +
'      <SRS>EPSG:2243</SRS>' +
'      <SRS>EPSG:2244</SRS>' +
'      <SRS>EPSG:2245</SRS>' +
'      <SRS>EPSG:2246</SRS>' +
'      <SRS>EPSG:2247</SRS>' +
'      <SRS>EPSG:2248</SRS>' +
'      <SRS>EPSG:2249</SRS>' +
'      <SRS>EPSG:2250</SRS>' +
'      <SRS>EPSG:2251</SRS>' +
'      <SRS>EPSG:2252</SRS>' +
'      <SRS>EPSG:2253</SRS>' +
'      <SRS>EPSG:2254</SRS>' +
'      <SRS>EPSG:2255</SRS>' +
'      <SRS>EPSG:2256</SRS>' +
'      <SRS>EPSG:2257</SRS>' +
'      <SRS>EPSG:2258</SRS>' +
'      <SRS>EPSG:2259</SRS>' +
'      <SRS>EPSG:2260</SRS>' +
'      <SRS>EPSG:2261</SRS>' +
'      <SRS>EPSG:2262</SRS>' +
'      <SRS>EPSG:2263</SRS>' +
'      <SRS>EPSG:2264</SRS>' +
'      <SRS>EPSG:2265</SRS>' +
'      <SRS>EPSG:2266</SRS>' +
'      <SRS>EPSG:2267</SRS>' +
'      <SRS>EPSG:2268</SRS>' +
'      <SRS>EPSG:2269</SRS>' +
'      <SRS>EPSG:2270</SRS>' +
'      <SRS>EPSG:2271</SRS>' +
'      <SRS>EPSG:2272</SRS>' +
'      <SRS>EPSG:2273</SRS>' +
'      <SRS>EPSG:2274</SRS>' +
'      <SRS>EPSG:2275</SRS>' +
'      <SRS>EPSG:2276</SRS>' +
'      <SRS>EPSG:2277</SRS>' +
'      <SRS>EPSG:2278</SRS>' +
'      <SRS>EPSG:2279</SRS>' +
'      <SRS>EPSG:2280</SRS>' +
'      <SRS>EPSG:2281</SRS>' +
'      <SRS>EPSG:2282</SRS>' +
'      <SRS>EPSG:2283</SRS>' +
'      <SRS>EPSG:2284</SRS>' +
'      <SRS>EPSG:2285</SRS>' +
'      <SRS>EPSG:2286</SRS>' +
'      <SRS>EPSG:2287</SRS>' +
'      <SRS>EPSG:2288</SRS>' +
'      <SRS>EPSG:2289</SRS>' +
'      <SRS>EPSG:2290</SRS>' +
'      <SRS>EPSG:2291</SRS>' +
'      <SRS>EPSG:2292</SRS>' +
'      <SRS>EPSG:2294</SRS>' +
'      <SRS>EPSG:2295</SRS>' +
'      <SRS>EPSG:2296</SRS>' +
'      <SRS>EPSG:2297</SRS>' +
'      <SRS>EPSG:2298</SRS>' +
'      <SRS>EPSG:2299</SRS>' +
'      <SRS>EPSG:2300</SRS>' +
'      <SRS>EPSG:2301</SRS>' +
'      <SRS>EPSG:2302</SRS>' +
'      <SRS>EPSG:2303</SRS>' +
'      <SRS>EPSG:2304</SRS>' +
'      <SRS>EPSG:2305</SRS>' +
'      <SRS>EPSG:2306</SRS>' +
'      <SRS>EPSG:2307</SRS>' +
'      <SRS>EPSG:2308</SRS>' +
'      <SRS>EPSG:2309</SRS>' +
'      <SRS>EPSG:2310</SRS>' +
'      <SRS>EPSG:2311</SRS>' +
'      <SRS>EPSG:2312</SRS>' +
'      <SRS>EPSG:2313</SRS>' +
'      <SRS>EPSG:2314</SRS>' +
'      <SRS>EPSG:2315</SRS>' +
'      <SRS>EPSG:2316</SRS>' +
'      <SRS>EPSG:2317</SRS>' +
'      <SRS>EPSG:2318</SRS>' +
'      <SRS>EPSG:2319</SRS>' +
'      <SRS>EPSG:2320</SRS>' +
'      <SRS>EPSG:2321</SRS>' +
'      <SRS>EPSG:2322</SRS>' +
'      <SRS>EPSG:2323</SRS>' +
'      <SRS>EPSG:2324</SRS>' +
'      <SRS>EPSG:2325</SRS>' +
'      <SRS>EPSG:2326</SRS>' +
'      <SRS>EPSG:2327</SRS>' +
'      <SRS>EPSG:2328</SRS>' +
'      <SRS>EPSG:2329</SRS>' +
'      <SRS>EPSG:2330</SRS>' +
'      <SRS>EPSG:2331</SRS>' +
'      <SRS>EPSG:2332</SRS>' +
'      <SRS>EPSG:2333</SRS>' +
'      <SRS>EPSG:2334</SRS>' +
'      <SRS>EPSG:2335</SRS>' +
'      <SRS>EPSG:2336</SRS>' +
'      <SRS>EPSG:2337</SRS>' +
'      <SRS>EPSG:2338</SRS>' +
'      <SRS>EPSG:2339</SRS>' +
'      <SRS>EPSG:2340</SRS>' +
'      <SRS>EPSG:2341</SRS>' +
'      <SRS>EPSG:2342</SRS>' +
'      <SRS>EPSG:2343</SRS>' +
'      <SRS>EPSG:2344</SRS>' +
'      <SRS>EPSG:2345</SRS>' +
'      <SRS>EPSG:2346</SRS>' +
'      <SRS>EPSG:2347</SRS>' +
'      <SRS>EPSG:2348</SRS>' +
'      <SRS>EPSG:2349</SRS>' +
'      <SRS>EPSG:2350</SRS>' +
'      <SRS>EPSG:2351</SRS>' +
'      <SRS>EPSG:2352</SRS>' +
'      <SRS>EPSG:2353</SRS>' +
'      <SRS>EPSG:2354</SRS>' +
'      <SRS>EPSG:2355</SRS>' +
'      <SRS>EPSG:2356</SRS>' +
'      <SRS>EPSG:2357</SRS>' +
'      <SRS>EPSG:2358</SRS>' +
'      <SRS>EPSG:2359</SRS>' +
'      <SRS>EPSG:2360</SRS>' +
'      <SRS>EPSG:2361</SRS>' +
'      <SRS>EPSG:2362</SRS>' +
'      <SRS>EPSG:2363</SRS>' +
'      <SRS>EPSG:2364</SRS>' +
'      <SRS>EPSG:2365</SRS>' +
'      <SRS>EPSG:2366</SRS>' +
'      <SRS>EPSG:2367</SRS>' +
'      <SRS>EPSG:2368</SRS>' +
'      <SRS>EPSG:2369</SRS>' +
'      <SRS>EPSG:2370</SRS>' +
'      <SRS>EPSG:2371</SRS>' +
'      <SRS>EPSG:2372</SRS>' +
'      <SRS>EPSG:2373</SRS>' +
'      <SRS>EPSG:2374</SRS>' +
'      <SRS>EPSG:2375</SRS>' +
'      <SRS>EPSG:2376</SRS>' +
'      <SRS>EPSG:2377</SRS>' +
'      <SRS>EPSG:2378</SRS>' +
'      <SRS>EPSG:2379</SRS>' +
'      <SRS>EPSG:2380</SRS>' +
'      <SRS>EPSG:2381</SRS>' +
'      <SRS>EPSG:2382</SRS>' +
'      <SRS>EPSG:2383</SRS>' +
'      <SRS>EPSG:2384</SRS>' +
'      <SRS>EPSG:2385</SRS>' +
'      <SRS>EPSG:2386</SRS>' +
'      <SRS>EPSG:2387</SRS>' +
'      <SRS>EPSG:2388</SRS>' +
'      <SRS>EPSG:2389</SRS>' +
'      <SRS>EPSG:2390</SRS>' +
'      <SRS>EPSG:2391</SRS>' +
'      <SRS>EPSG:2392</SRS>' +
'      <SRS>EPSG:2393</SRS>' +
'      <SRS>EPSG:2394</SRS>' +
'      <SRS>EPSG:2395</SRS>' +
'      <SRS>EPSG:2396</SRS>' +
'      <SRS>EPSG:2397</SRS>' +
'      <SRS>EPSG:2398</SRS>' +
'      <SRS>EPSG:2399</SRS>' +
'      <SRS>EPSG:2400</SRS>' +
'      <SRS>EPSG:2401</SRS>' +
'      <SRS>EPSG:2402</SRS>' +
'      <SRS>EPSG:2403</SRS>' +
'      <SRS>EPSG:2404</SRS>' +
'      <SRS>EPSG:2405</SRS>' +
'      <SRS>EPSG:2406</SRS>' +
'      <SRS>EPSG:2407</SRS>' +
'      <SRS>EPSG:2408</SRS>' +
'      <SRS>EPSG:2409</SRS>' +
'      <SRS>EPSG:2410</SRS>' +
'      <SRS>EPSG:2411</SRS>' +
'      <SRS>EPSG:2412</SRS>' +
'      <SRS>EPSG:2413</SRS>' +
'      <SRS>EPSG:2414</SRS>' +
'      <SRS>EPSG:2415</SRS>' +
'      <SRS>EPSG:2416</SRS>' +
'      <SRS>EPSG:2417</SRS>' +
'      <SRS>EPSG:2418</SRS>' +
'      <SRS>EPSG:2419</SRS>' +
'      <SRS>EPSG:2420</SRS>' +
'      <SRS>EPSG:2421</SRS>' +
'      <SRS>EPSG:2422</SRS>' +
'      <SRS>EPSG:2423</SRS>' +
'      <SRS>EPSG:2424</SRS>' +
'      <SRS>EPSG:2425</SRS>' +
'      <SRS>EPSG:2426</SRS>' +
'      <SRS>EPSG:2427</SRS>' +
'      <SRS>EPSG:2428</SRS>' +
'      <SRS>EPSG:2429</SRS>' +
'      <SRS>EPSG:2430</SRS>' +
'      <SRS>EPSG:2431</SRS>' +
'      <SRS>EPSG:2432</SRS>' +
'      <SRS>EPSG:2433</SRS>' +
'      <SRS>EPSG:2434</SRS>' +
'      <SRS>EPSG:2435</SRS>' +
'      <SRS>EPSG:2436</SRS>' +
'      <SRS>EPSG:2437</SRS>' +
'      <SRS>EPSG:2438</SRS>' +
'      <SRS>EPSG:2439</SRS>' +
'      <SRS>EPSG:2440</SRS>' +
'      <SRS>EPSG:2441</SRS>' +
'      <SRS>EPSG:2442</SRS>' +
'      <SRS>EPSG:2443</SRS>' +
'      <SRS>EPSG:2444</SRS>' +
'      <SRS>EPSG:2445</SRS>' +
'      <SRS>EPSG:2446</SRS>' +
'      <SRS>EPSG:2447</SRS>' +
'      <SRS>EPSG:2448</SRS>' +
'      <SRS>EPSG:2449</SRS>' +
'      <SRS>EPSG:2450</SRS>' +
'      <SRS>EPSG:2451</SRS>' +
'      <SRS>EPSG:2452</SRS>' +
'      <SRS>EPSG:2453</SRS>' +
'      <SRS>EPSG:2454</SRS>' +
'      <SRS>EPSG:2455</SRS>' +
'      <SRS>EPSG:2456</SRS>' +
'      <SRS>EPSG:2457</SRS>' +
'      <SRS>EPSG:2458</SRS>' +
'      <SRS>EPSG:2459</SRS>' +
'      <SRS>EPSG:2460</SRS>' +
'      <SRS>EPSG:2461</SRS>' +
'      <SRS>EPSG:2462</SRS>' +
'      <SRS>EPSG:2463</SRS>' +
'      <SRS>EPSG:2464</SRS>' +
'      <SRS>EPSG:2465</SRS>' +
'      <SRS>EPSG:2466</SRS>' +
'      <SRS>EPSG:2467</SRS>' +
'      <SRS>EPSG:2468</SRS>' +
'      <SRS>EPSG:2469</SRS>' +
'      <SRS>EPSG:2470</SRS>' +
'      <SRS>EPSG:2471</SRS>' +
'      <SRS>EPSG:2472</SRS>' +
'      <SRS>EPSG:2473</SRS>' +
'      <SRS>EPSG:2474</SRS>' +
'      <SRS>EPSG:2475</SRS>' +
'      <SRS>EPSG:2476</SRS>' +
'      <SRS>EPSG:2477</SRS>' +
'      <SRS>EPSG:2478</SRS>' +
'      <SRS>EPSG:2479</SRS>' +
'      <SRS>EPSG:2480</SRS>' +
'      <SRS>EPSG:2481</SRS>' +
'      <SRS>EPSG:2482</SRS>' +
'      <SRS>EPSG:2483</SRS>' +
'      <SRS>EPSG:2484</SRS>' +
'      <SRS>EPSG:2485</SRS>' +
'      <SRS>EPSG:2486</SRS>' +
'      <SRS>EPSG:2487</SRS>' +
'      <SRS>EPSG:2488</SRS>' +
'      <SRS>EPSG:2489</SRS>' +
'      <SRS>EPSG:2490</SRS>' +
'      <SRS>EPSG:2491</SRS>' +
'      <SRS>EPSG:2492</SRS>' +
'      <SRS>EPSG:2493</SRS>' +
'      <SRS>EPSG:2494</SRS>' +
'      <SRS>EPSG:2495</SRS>' +
'      <SRS>EPSG:2496</SRS>' +
'      <SRS>EPSG:2497</SRS>' +
'      <SRS>EPSG:2498</SRS>' +
'      <SRS>EPSG:2499</SRS>' +
'      <SRS>EPSG:2500</SRS>' +
'      <SRS>EPSG:2501</SRS>' +
'      <SRS>EPSG:2502</SRS>' +
'      <SRS>EPSG:2503</SRS>' +
'      <SRS>EPSG:2504</SRS>' +
'      <SRS>EPSG:2505</SRS>' +
'      <SRS>EPSG:2506</SRS>' +
'      <SRS>EPSG:2507</SRS>' +
'      <SRS>EPSG:2508</SRS>' +
'      <SRS>EPSG:2509</SRS>' +
'      <SRS>EPSG:2510</SRS>' +
'      <SRS>EPSG:2511</SRS>' +
'      <SRS>EPSG:2512</SRS>' +
'      <SRS>EPSG:2513</SRS>' +
'      <SRS>EPSG:2514</SRS>' +
'      <SRS>EPSG:2515</SRS>' +
'      <SRS>EPSG:2516</SRS>' +
'      <SRS>EPSG:2517</SRS>' +
'      <SRS>EPSG:2518</SRS>' +
'      <SRS>EPSG:2519</SRS>' +
'      <SRS>EPSG:2520</SRS>' +
'      <SRS>EPSG:2521</SRS>' +
'      <SRS>EPSG:2522</SRS>' +
'      <SRS>EPSG:2523</SRS>' +
'      <SRS>EPSG:2524</SRS>' +
'      <SRS>EPSG:2525</SRS>' +
'      <SRS>EPSG:2526</SRS>' +
'      <SRS>EPSG:2527</SRS>' +
'      <SRS>EPSG:2528</SRS>' +
'      <SRS>EPSG:2529</SRS>' +
'      <SRS>EPSG:2530</SRS>' +
'      <SRS>EPSG:2531</SRS>' +
'      <SRS>EPSG:2532</SRS>' +
'      <SRS>EPSG:2533</SRS>' +
'      <SRS>EPSG:2534</SRS>' +
'      <SRS>EPSG:2535</SRS>' +
'      <SRS>EPSG:2536</SRS>' +
'      <SRS>EPSG:2537</SRS>' +
'      <SRS>EPSG:2538</SRS>' +
'      <SRS>EPSG:2539</SRS>' +
'      <SRS>EPSG:2540</SRS>' +
'      <SRS>EPSG:2541</SRS>' +
'      <SRS>EPSG:2542</SRS>' +
'      <SRS>EPSG:2543</SRS>' +
'      <SRS>EPSG:2544</SRS>' +
'      <SRS>EPSG:2545</SRS>' +
'      <SRS>EPSG:2546</SRS>' +
'      <SRS>EPSG:2547</SRS>' +
'      <SRS>EPSG:2548</SRS>' +
'      <SRS>EPSG:2549</SRS>' +
'      <SRS>EPSG:2550</SRS>' +
'      <SRS>EPSG:2551</SRS>' +
'      <SRS>EPSG:2552</SRS>' +
'      <SRS>EPSG:2553</SRS>' +
'      <SRS>EPSG:2554</SRS>' +
'      <SRS>EPSG:2555</SRS>' +
'      <SRS>EPSG:2556</SRS>' +
'      <SRS>EPSG:2557</SRS>' +
'      <SRS>EPSG:2558</SRS>' +
'      <SRS>EPSG:2559</SRS>' +
'      <SRS>EPSG:2560</SRS>' +
'      <SRS>EPSG:2561</SRS>' +
'      <SRS>EPSG:2562</SRS>' +
'      <SRS>EPSG:2563</SRS>' +
'      <SRS>EPSG:2564</SRS>' +
'      <SRS>EPSG:2565</SRS>' +
'      <SRS>EPSG:2566</SRS>' +
'      <SRS>EPSG:2567</SRS>' +
'      <SRS>EPSG:2568</SRS>' +
'      <SRS>EPSG:2569</SRS>' +
'      <SRS>EPSG:2570</SRS>' +
'      <SRS>EPSG:2571</SRS>' +
'      <SRS>EPSG:2572</SRS>' +
'      <SRS>EPSG:2573</SRS>' +
'      <SRS>EPSG:2574</SRS>' +
'      <SRS>EPSG:2575</SRS>' +
'      <SRS>EPSG:2576</SRS>' +
'      <SRS>EPSG:2577</SRS>' +
'      <SRS>EPSG:2578</SRS>' +
'      <SRS>EPSG:2579</SRS>' +
'      <SRS>EPSG:2580</SRS>' +
'      <SRS>EPSG:2581</SRS>' +
'      <SRS>EPSG:2582</SRS>' +
'      <SRS>EPSG:2583</SRS>' +
'      <SRS>EPSG:2584</SRS>' +
'      <SRS>EPSG:2585</SRS>' +
'      <SRS>EPSG:2586</SRS>' +
'      <SRS>EPSG:2587</SRS>' +
'      <SRS>EPSG:2588</SRS>' +
'      <SRS>EPSG:2589</SRS>' +
'      <SRS>EPSG:2590</SRS>' +
'      <SRS>EPSG:2591</SRS>' +
'      <SRS>EPSG:2592</SRS>' +
'      <SRS>EPSG:2593</SRS>' +
'      <SRS>EPSG:2594</SRS>' +
'      <SRS>EPSG:2595</SRS>' +
'      <SRS>EPSG:2596</SRS>' +
'      <SRS>EPSG:2597</SRS>' +
'      <SRS>EPSG:2598</SRS>' +
'      <SRS>EPSG:2599</SRS>' +
'      <SRS>EPSG:2600</SRS>' +
'      <SRS>EPSG:2601</SRS>' +
'      <SRS>EPSG:2602</SRS>' +
'      <SRS>EPSG:2603</SRS>' +
'      <SRS>EPSG:2604</SRS>' +
'      <SRS>EPSG:2605</SRS>' +
'      <SRS>EPSG:2606</SRS>' +
'      <SRS>EPSG:2607</SRS>' +
'      <SRS>EPSG:2608</SRS>' +
'      <SRS>EPSG:2609</SRS>' +
'      <SRS>EPSG:2610</SRS>' +
'      <SRS>EPSG:2611</SRS>' +
'      <SRS>EPSG:2612</SRS>' +
'      <SRS>EPSG:2613</SRS>' +
'      <SRS>EPSG:2614</SRS>' +
'      <SRS>EPSG:2615</SRS>' +
'      <SRS>EPSG:2616</SRS>' +
'      <SRS>EPSG:2617</SRS>' +
'      <SRS>EPSG:2618</SRS>' +
'      <SRS>EPSG:2619</SRS>' +
'      <SRS>EPSG:2620</SRS>' +
'      <SRS>EPSG:2621</SRS>' +
'      <SRS>EPSG:2622</SRS>' +
'      <SRS>EPSG:2623</SRS>' +
'      <SRS>EPSG:2624</SRS>' +
'      <SRS>EPSG:2625</SRS>' +
'      <SRS>EPSG:2626</SRS>' +
'      <SRS>EPSG:2627</SRS>' +
'      <SRS>EPSG:2628</SRS>' +
'      <SRS>EPSG:2629</SRS>' +
'      <SRS>EPSG:2630</SRS>' +
'      <SRS>EPSG:2631</SRS>' +
'      <SRS>EPSG:2632</SRS>' +
'      <SRS>EPSG:2633</SRS>' +
'      <SRS>EPSG:2634</SRS>' +
'      <SRS>EPSG:2635</SRS>' +
'      <SRS>EPSG:2636</SRS>' +
'      <SRS>EPSG:2637</SRS>' +
'      <SRS>EPSG:2638</SRS>' +
'      <SRS>EPSG:2639</SRS>' +
'      <SRS>EPSG:2640</SRS>' +
'      <SRS>EPSG:2641</SRS>' +
'      <SRS>EPSG:2642</SRS>' +
'      <SRS>EPSG:2643</SRS>' +
'      <SRS>EPSG:2644</SRS>' +
'      <SRS>EPSG:2645</SRS>' +
'      <SRS>EPSG:2646</SRS>' +
'      <SRS>EPSG:2647</SRS>' +
'      <SRS>EPSG:2648</SRS>' +
'      <SRS>EPSG:2649</SRS>' +
'      <SRS>EPSG:2650</SRS>' +
'      <SRS>EPSG:2651</SRS>' +
'      <SRS>EPSG:2652</SRS>' +
'      <SRS>EPSG:2653</SRS>' +
'      <SRS>EPSG:2654</SRS>' +
'      <SRS>EPSG:2655</SRS>' +
'      <SRS>EPSG:2656</SRS>' +
'      <SRS>EPSG:2657</SRS>' +
'      <SRS>EPSG:2658</SRS>' +
'      <SRS>EPSG:2659</SRS>' +
'      <SRS>EPSG:2660</SRS>' +
'      <SRS>EPSG:2661</SRS>' +
'      <SRS>EPSG:2662</SRS>' +
'      <SRS>EPSG:2663</SRS>' +
'      <SRS>EPSG:2664</SRS>' +
'      <SRS>EPSG:2665</SRS>' +
'      <SRS>EPSG:2666</SRS>' +
'      <SRS>EPSG:2667</SRS>' +
'      <SRS>EPSG:2668</SRS>' +
'      <SRS>EPSG:2669</SRS>' +
'      <SRS>EPSG:2670</SRS>' +
'      <SRS>EPSG:2671</SRS>' +
'      <SRS>EPSG:2672</SRS>' +
'      <SRS>EPSG:2673</SRS>' +
'      <SRS>EPSG:2674</SRS>' +
'      <SRS>EPSG:2675</SRS>' +
'      <SRS>EPSG:2676</SRS>' +
'      <SRS>EPSG:2677</SRS>' +
'      <SRS>EPSG:2678</SRS>' +
'      <SRS>EPSG:2679</SRS>' +
'      <SRS>EPSG:2680</SRS>' +
'      <SRS>EPSG:2681</SRS>' +
'      <SRS>EPSG:2682</SRS>' +
'      <SRS>EPSG:2683</SRS>' +
'      <SRS>EPSG:2684</SRS>' +
'      <SRS>EPSG:2685</SRS>' +
'      <SRS>EPSG:2686</SRS>' +
'      <SRS>EPSG:2687</SRS>' +
'      <SRS>EPSG:2688</SRS>' +
'      <SRS>EPSG:2689</SRS>' +
'      <SRS>EPSG:2690</SRS>' +
'      <SRS>EPSG:2691</SRS>' +
'      <SRS>EPSG:2692</SRS>' +
'      <SRS>EPSG:2693</SRS>' +
'      <SRS>EPSG:2694</SRS>' +
'      <SRS>EPSG:2695</SRS>' +
'      <SRS>EPSG:2696</SRS>' +
'      <SRS>EPSG:2697</SRS>' +
'      <SRS>EPSG:2698</SRS>' +
'      <SRS>EPSG:2699</SRS>' +
'      <SRS>EPSG:2700</SRS>' +
'      <SRS>EPSG:2701</SRS>' +
'      <SRS>EPSG:2702</SRS>' +
'      <SRS>EPSG:2703</SRS>' +
'      <SRS>EPSG:2704</SRS>' +
'      <SRS>EPSG:2705</SRS>' +
'      <SRS>EPSG:2706</SRS>' +
'      <SRS>EPSG:2707</SRS>' +
'      <SRS>EPSG:2708</SRS>' +
'      <SRS>EPSG:2709</SRS>' +
'      <SRS>EPSG:2710</SRS>' +
'      <SRS>EPSG:2711</SRS>' +
'      <SRS>EPSG:2712</SRS>' +
'      <SRS>EPSG:2713</SRS>' +
'      <SRS>EPSG:2714</SRS>' +
'      <SRS>EPSG:2715</SRS>' +
'      <SRS>EPSG:2716</SRS>' +
'      <SRS>EPSG:2717</SRS>' +
'      <SRS>EPSG:2718</SRS>' +
'      <SRS>EPSG:2719</SRS>' +
'      <SRS>EPSG:2720</SRS>' +
'      <SRS>EPSG:2721</SRS>' +
'      <SRS>EPSG:2722</SRS>' +
'      <SRS>EPSG:2723</SRS>' +
'      <SRS>EPSG:2724</SRS>' +
'      <SRS>EPSG:2725</SRS>' +
'      <SRS>EPSG:2726</SRS>' +
'      <SRS>EPSG:2727</SRS>' +
'      <SRS>EPSG:2728</SRS>' +
'      <SRS>EPSG:2729</SRS>' +
'      <SRS>EPSG:2730</SRS>' +
'      <SRS>EPSG:2731</SRS>' +
'      <SRS>EPSG:2732</SRS>' +
'      <SRS>EPSG:2733</SRS>' +
'      <SRS>EPSG:2734</SRS>' +
'      <SRS>EPSG:2735</SRS>' +
'      <SRS>EPSG:2736</SRS>' +
'      <SRS>EPSG:2737</SRS>' +
'      <SRS>EPSG:2738</SRS>' +
'      <SRS>EPSG:2739</SRS>' +
'      <SRS>EPSG:2740</SRS>' +
'      <SRS>EPSG:2741</SRS>' +
'      <SRS>EPSG:2742</SRS>' +
'      <SRS>EPSG:2743</SRS>' +
'      <SRS>EPSG:2744</SRS>' +
'      <SRS>EPSG:2745</SRS>' +
'      <SRS>EPSG:2746</SRS>' +
'      <SRS>EPSG:2747</SRS>' +
'      <SRS>EPSG:2748</SRS>' +
'      <SRS>EPSG:2749</SRS>' +
'      <SRS>EPSG:2750</SRS>' +
'      <SRS>EPSG:2751</SRS>' +
'      <SRS>EPSG:2752</SRS>' +
'      <SRS>EPSG:2753</SRS>' +
'      <SRS>EPSG:2754</SRS>' +
'      <SRS>EPSG:2755</SRS>' +
'      <SRS>EPSG:2756</SRS>' +
'      <SRS>EPSG:2757</SRS>' +
'      <SRS>EPSG:2758</SRS>' +
'      <SRS>EPSG:2759</SRS>' +
'      <SRS>EPSG:2760</SRS>' +
'      <SRS>EPSG:2761</SRS>' +
'      <SRS>EPSG:2762</SRS>' +
'      <SRS>EPSG:2763</SRS>' +
'      <SRS>EPSG:2764</SRS>' +
'      <SRS>EPSG:2765</SRS>' +
'      <SRS>EPSG:2766</SRS>' +
'      <SRS>EPSG:2767</SRS>' +
'      <SRS>EPSG:2768</SRS>' +
'      <SRS>EPSG:2769</SRS>' +
'      <SRS>EPSG:2770</SRS>' +
'      <SRS>EPSG:2771</SRS>' +
'      <SRS>EPSG:2772</SRS>' +
'      <SRS>EPSG:2773</SRS>' +
'      <SRS>EPSG:2774</SRS>' +
'      <SRS>EPSG:2775</SRS>' +
'      <SRS>EPSG:2776</SRS>' +
'      <SRS>EPSG:2777</SRS>' +
'      <SRS>EPSG:2778</SRS>' +
'      <SRS>EPSG:2779</SRS>' +
'      <SRS>EPSG:2780</SRS>' +
'      <SRS>EPSG:2781</SRS>' +
'      <SRS>EPSG:2782</SRS>' +
'      <SRS>EPSG:2783</SRS>' +
'      <SRS>EPSG:2784</SRS>' +
'      <SRS>EPSG:2785</SRS>' +
'      <SRS>EPSG:2786</SRS>' +
'      <SRS>EPSG:2787</SRS>' +
'      <SRS>EPSG:2788</SRS>' +
'      <SRS>EPSG:2789</SRS>' +
'      <SRS>EPSG:2790</SRS>' +
'      <SRS>EPSG:2791</SRS>' +
'      <SRS>EPSG:2792</SRS>' +
'      <SRS>EPSG:2793</SRS>' +
'      <SRS>EPSG:2794</SRS>' +
'      <SRS>EPSG:2795</SRS>' +
'      <SRS>EPSG:2796</SRS>' +
'      <SRS>EPSG:2797</SRS>' +
'      <SRS>EPSG:2798</SRS>' +
'      <SRS>EPSG:2799</SRS>' +
'      <SRS>EPSG:2800</SRS>' +
'      <SRS>EPSG:2801</SRS>' +
'      <SRS>EPSG:2802</SRS>' +
'      <SRS>EPSG:2803</SRS>' +
'      <SRS>EPSG:2804</SRS>' +
'      <SRS>EPSG:2805</SRS>' +
'      <SRS>EPSG:2806</SRS>' +
'      <SRS>EPSG:2807</SRS>' +
'      <SRS>EPSG:2808</SRS>' +
'      <SRS>EPSG:2809</SRS>' +
'      <SRS>EPSG:2810</SRS>' +
'      <SRS>EPSG:2811</SRS>' +
'      <SRS>EPSG:2812</SRS>' +
'      <SRS>EPSG:2813</SRS>' +
'      <SRS>EPSG:2814</SRS>' +
'      <SRS>EPSG:2815</SRS>' +
'      <SRS>EPSG:2816</SRS>' +
'      <SRS>EPSG:2817</SRS>' +
'      <SRS>EPSG:2818</SRS>' +
'      <SRS>EPSG:2819</SRS>' +
'      <SRS>EPSG:2820</SRS>' +
'      <SRS>EPSG:2821</SRS>' +
'      <SRS>EPSG:2822</SRS>' +
'      <SRS>EPSG:2823</SRS>' +
'      <SRS>EPSG:2824</SRS>' +
'      <SRS>EPSG:2825</SRS>' +
'      <SRS>EPSG:2826</SRS>' +
'      <SRS>EPSG:2827</SRS>' +
'      <SRS>EPSG:2828</SRS>' +
'      <SRS>EPSG:2829</SRS>' +
'      <SRS>EPSG:2830</SRS>' +
'      <SRS>EPSG:2831</SRS>' +
'      <SRS>EPSG:2832</SRS>' +
'      <SRS>EPSG:2833</SRS>' +
'      <SRS>EPSG:2834</SRS>' +
'      <SRS>EPSG:2835</SRS>' +
'      <SRS>EPSG:2836</SRS>' +
'      <SRS>EPSG:2837</SRS>' +
'      <SRS>EPSG:2838</SRS>' +
'      <SRS>EPSG:2839</SRS>' +
'      <SRS>EPSG:2840</SRS>' +
'      <SRS>EPSG:2841</SRS>' +
'      <SRS>EPSG:2842</SRS>' +
'      <SRS>EPSG:2843</SRS>' +
'      <SRS>EPSG:2844</SRS>' +
'      <SRS>EPSG:2845</SRS>' +
'      <SRS>EPSG:2846</SRS>' +
'      <SRS>EPSG:2847</SRS>' +
'      <SRS>EPSG:2848</SRS>' +
'      <SRS>EPSG:2849</SRS>' +
'      <SRS>EPSG:2850</SRS>' +
'      <SRS>EPSG:2851</SRS>' +
'      <SRS>EPSG:2852</SRS>' +
'      <SRS>EPSG:2853</SRS>' +
'      <SRS>EPSG:2854</SRS>' +
'      <SRS>EPSG:2855</SRS>' +
'      <SRS>EPSG:2856</SRS>' +
'      <SRS>EPSG:2857</SRS>' +
'      <SRS>EPSG:2858</SRS>' +
'      <SRS>EPSG:2859</SRS>' +
'      <SRS>EPSG:2860</SRS>' +
'      <SRS>EPSG:2861</SRS>' +
'      <SRS>EPSG:2862</SRS>' +
'      <SRS>EPSG:2863</SRS>' +
'      <SRS>EPSG:2864</SRS>' +
'      <SRS>EPSG:2865</SRS>' +
'      <SRS>EPSG:2866</SRS>' +
'      <SRS>EPSG:2867</SRS>' +
'      <SRS>EPSG:2868</SRS>' +
'      <SRS>EPSG:2869</SRS>' +
'      <SRS>EPSG:2870</SRS>' +
'      <SRS>EPSG:2871</SRS>' +
'      <SRS>EPSG:2872</SRS>' +
'      <SRS>EPSG:2873</SRS>' +
'      <SRS>EPSG:2874</SRS>' +
'      <SRS>EPSG:2875</SRS>' +
'      <SRS>EPSG:2876</SRS>' +
'      <SRS>EPSG:2877</SRS>' +
'      <SRS>EPSG:2878</SRS>' +
'      <SRS>EPSG:2879</SRS>' +
'      <SRS>EPSG:2880</SRS>' +
'      <SRS>EPSG:2881</SRS>' +
'      <SRS>EPSG:2882</SRS>' +
'      <SRS>EPSG:2883</SRS>' +
'      <SRS>EPSG:2884</SRS>' +
'      <SRS>EPSG:2885</SRS>' +
'      <SRS>EPSG:2886</SRS>' +
'      <SRS>EPSG:2887</SRS>' +
'      <SRS>EPSG:2888</SRS>' +
'      <SRS>EPSG:2889</SRS>' +
'      <SRS>EPSG:2890</SRS>' +
'      <SRS>EPSG:2891</SRS>' +
'      <SRS>EPSG:2892</SRS>' +
'      <SRS>EPSG:2893</SRS>' +
'      <SRS>EPSG:2894</SRS>' +
'      <SRS>EPSG:2895</SRS>' +
'      <SRS>EPSG:2896</SRS>' +
'      <SRS>EPSG:2897</SRS>' +
'      <SRS>EPSG:2898</SRS>' +
'      <SRS>EPSG:2899</SRS>' +
'      <SRS>EPSG:2900</SRS>' +
'      <SRS>EPSG:2901</SRS>' +
'      <SRS>EPSG:2902</SRS>' +
'      <SRS>EPSG:2903</SRS>' +
'      <SRS>EPSG:2904</SRS>' +
'      <SRS>EPSG:2905</SRS>' +
'      <SRS>EPSG:2906</SRS>' +
'      <SRS>EPSG:2907</SRS>' +
'      <SRS>EPSG:2908</SRS>' +
'      <SRS>EPSG:2909</SRS>' +
'      <SRS>EPSG:2910</SRS>' +
'      <SRS>EPSG:2911</SRS>' +
'      <SRS>EPSG:2912</SRS>' +
'      <SRS>EPSG:2913</SRS>' +
'      <SRS>EPSG:2914</SRS>' +
'      <SRS>EPSG:2915</SRS>' +
'      <SRS>EPSG:2916</SRS>' +
'      <SRS>EPSG:2917</SRS>' +
'      <SRS>EPSG:2918</SRS>' +
'      <SRS>EPSG:2919</SRS>' +
'      <SRS>EPSG:2920</SRS>' +
'      <SRS>EPSG:2921</SRS>' +
'      <SRS>EPSG:2922</SRS>' +
'      <SRS>EPSG:2923</SRS>' +
'      <SRS>EPSG:2924</SRS>' +
'      <SRS>EPSG:2925</SRS>' +
'      <SRS>EPSG:2926</SRS>' +
'      <SRS>EPSG:2927</SRS>' +
'      <SRS>EPSG:2928</SRS>' +
'      <SRS>EPSG:2929</SRS>' +
'      <SRS>EPSG:2930</SRS>' +
'      <SRS>EPSG:2931</SRS>' +
'      <SRS>EPSG:2932</SRS>' +
'      <SRS>EPSG:2933</SRS>' +
'      <SRS>EPSG:2934</SRS>' +
'      <SRS>EPSG:2935</SRS>' +
'      <SRS>EPSG:2936</SRS>' +
'      <SRS>EPSG:2937</SRS>' +
'      <SRS>EPSG:2938</SRS>' +
'      <SRS>EPSG:2939</SRS>' +
'      <SRS>EPSG:2940</SRS>' +
'      <SRS>EPSG:2941</SRS>' +
'      <SRS>EPSG:2942</SRS>' +
'      <SRS>EPSG:2943</SRS>' +
'      <SRS>EPSG:2944</SRS>' +
'      <SRS>EPSG:2945</SRS>' +
'      <SRS>EPSG:2946</SRS>' +
'      <SRS>EPSG:2947</SRS>' +
'      <SRS>EPSG:2948</SRS>' +
'      <SRS>EPSG:2949</SRS>' +
'      <SRS>EPSG:2950</SRS>' +
'      <SRS>EPSG:2951</SRS>' +
'      <SRS>EPSG:2952</SRS>' +
'      <SRS>EPSG:2953</SRS>' +
'      <SRS>EPSG:2954</SRS>' +
'      <SRS>EPSG:2955</SRS>' +
'      <SRS>EPSG:2956</SRS>' +
'      <SRS>EPSG:2957</SRS>' +
'      <SRS>EPSG:2958</SRS>' +
'      <SRS>EPSG:2959</SRS>' +
'      <SRS>EPSG:2960</SRS>' +
'      <SRS>EPSG:2961</SRS>' +
'      <SRS>EPSG:2962</SRS>' +
'      <SRS>EPSG:2963</SRS>' +
'      <SRS>EPSG:2964</SRS>' +
'      <SRS>EPSG:2965</SRS>' +
'      <SRS>EPSG:2966</SRS>' +
'      <SRS>EPSG:2967</SRS>' +
'      <SRS>EPSG:2968</SRS>' +
'      <SRS>EPSG:2969</SRS>' +
'      <SRS>EPSG:2970</SRS>' +
'      <SRS>EPSG:2971</SRS>' +
'      <SRS>EPSG:2972</SRS>' +
'      <SRS>EPSG:2973</SRS>' +
'      <SRS>EPSG:2975</SRS>' +
'      <SRS>EPSG:2976</SRS>' +
'      <SRS>EPSG:2977</SRS>' +
'      <SRS>EPSG:2978</SRS>' +
'      <SRS>EPSG:2979</SRS>' +
'      <SRS>EPSG:2980</SRS>' +
'      <SRS>EPSG:2981</SRS>' +
'      <SRS>EPSG:2982</SRS>' +
'      <SRS>EPSG:2983</SRS>' +
'      <SRS>EPSG:2984</SRS>' +
'      <SRS>EPSG:2985</SRS>' +
'      <SRS>EPSG:2986</SRS>' +
'      <SRS>EPSG:2987</SRS>' +
'      <SRS>EPSG:2988</SRS>' +
'      <SRS>EPSG:2989</SRS>' +
'      <SRS>EPSG:2990</SRS>' +
'      <SRS>EPSG:2991</SRS>' +
'      <SRS>EPSG:2992</SRS>' +
'      <SRS>EPSG:2993</SRS>' +
'      <SRS>EPSG:2994</SRS>' +
'      <SRS>EPSG:2995</SRS>' +
'      <SRS>EPSG:2996</SRS>' +
'      <SRS>EPSG:2997</SRS>' +
'      <SRS>EPSG:2998</SRS>' +
'      <SRS>EPSG:2999</SRS>' +
'      <SRS>EPSG:3000</SRS>' +
'      <SRS>EPSG:3001</SRS>' +
'      <SRS>EPSG:3002</SRS>' +
'      <SRS>EPSG:3003</SRS>' +
'      <SRS>EPSG:3004</SRS>' +
'      <SRS>EPSG:3005</SRS>' +
'      <SRS>EPSG:3006</SRS>' +
'      <SRS>EPSG:3007</SRS>' +
'      <SRS>EPSG:3008</SRS>' +
'      <SRS>EPSG:3009</SRS>' +
'      <SRS>EPSG:3010</SRS>' +
'      <SRS>EPSG:3011</SRS>' +
'      <SRS>EPSG:3012</SRS>' +
'      <SRS>EPSG:3013</SRS>' +
'      <SRS>EPSG:3014</SRS>' +
'      <SRS>EPSG:3015</SRS>' +
'      <SRS>EPSG:3016</SRS>' +
'      <SRS>EPSG:3017</SRS>' +
'      <SRS>EPSG:3018</SRS>' +
'      <SRS>EPSG:3019</SRS>' +
'      <SRS>EPSG:3020</SRS>' +
'      <SRS>EPSG:3021</SRS>' +
'      <SRS>EPSG:3022</SRS>' +
'      <SRS>EPSG:3023</SRS>' +
'      <SRS>EPSG:3024</SRS>' +
'      <SRS>EPSG:3025</SRS>' +
'      <SRS>EPSG:3026</SRS>' +
'      <SRS>EPSG:3027</SRS>' +
'      <SRS>EPSG:3028</SRS>' +
'      <SRS>EPSG:3029</SRS>' +
'      <SRS>EPSG:3030</SRS>' +
'      <SRS>EPSG:3031</SRS>' +
'      <SRS>EPSG:3032</SRS>' +
'      <SRS>EPSG:3033</SRS>' +
'      <SRS>EPSG:3034</SRS>' +
'      <SRS>EPSG:3035</SRS>' +
'      <SRS>EPSG:3036</SRS>' +
'      <SRS>EPSG:3037</SRS>' +
'      <SRS>EPSG:3038</SRS>' +
'      <SRS>EPSG:3039</SRS>' +
'      <SRS>EPSG:3040</SRS>' +
'      <SRS>EPSG:3041</SRS>' +
'      <SRS>EPSG:3042</SRS>' +
'      <SRS>EPSG:3043</SRS>' +
'      <SRS>EPSG:3044</SRS>' +
'      <SRS>EPSG:3045</SRS>' +
'      <SRS>EPSG:3046</SRS>' +
'      <SRS>EPSG:3047</SRS>' +
'      <SRS>EPSG:3048</SRS>' +
'      <SRS>EPSG:3049</SRS>' +
'      <SRS>EPSG:3050</SRS>' +
'      <SRS>EPSG:3051</SRS>' +
'      <SRS>EPSG:3052</SRS>' +
'      <SRS>EPSG:3053</SRS>' +
'      <SRS>EPSG:3054</SRS>' +
'      <SRS>EPSG:3055</SRS>' +
'      <SRS>EPSG:3056</SRS>' +
'      <SRS>EPSG:3057</SRS>' +
'      <SRS>EPSG:3058</SRS>' +
'      <SRS>EPSG:3059</SRS>' +
'      <SRS>EPSG:3060</SRS>' +
'      <SRS>EPSG:3061</SRS>' +
'      <SRS>EPSG:3062</SRS>' +
'      <SRS>EPSG:3063</SRS>' +
'      <SRS>EPSG:3064</SRS>' +
'      <SRS>EPSG:3065</SRS>' +
'      <SRS>EPSG:3066</SRS>' +
'      <SRS>EPSG:3067</SRS>' +
'      <SRS>EPSG:3068</SRS>' +
'      <SRS>EPSG:3069</SRS>' +
'      <SRS>EPSG:3070</SRS>' +
'      <SRS>EPSG:3071</SRS>' +
'      <SRS>EPSG:3072</SRS>' +
'      <SRS>EPSG:3073</SRS>' +
'      <SRS>EPSG:3074</SRS>' +
'      <SRS>EPSG:3075</SRS>' +
'      <SRS>EPSG:3076</SRS>' +
'      <SRS>EPSG:3077</SRS>' +
'      <SRS>EPSG:3078</SRS>' +
'      <SRS>EPSG:3079</SRS>' +
'      <SRS>EPSG:3080</SRS>' +
'      <SRS>EPSG:3081</SRS>' +
'      <SRS>EPSG:3082</SRS>' +
'      <SRS>EPSG:3083</SRS>' +
'      <SRS>EPSG:3084</SRS>' +
'      <SRS>EPSG:3085</SRS>' +
'      <SRS>EPSG:3086</SRS>' +
'      <SRS>EPSG:3087</SRS>' +
'      <SRS>EPSG:3088</SRS>' +
'      <SRS>EPSG:3089</SRS>' +
'      <SRS>EPSG:3090</SRS>' +
'      <SRS>EPSG:3091</SRS>' +
'      <SRS>EPSG:3092</SRS>' +
'      <SRS>EPSG:3093</SRS>' +
'      <SRS>EPSG:3094</SRS>' +
'      <SRS>EPSG:3095</SRS>' +
'      <SRS>EPSG:3096</SRS>' +
'      <SRS>EPSG:3097</SRS>' +
'      <SRS>EPSG:3098</SRS>' +
'      <SRS>EPSG:3099</SRS>' +
'      <SRS>EPSG:3100</SRS>' +
'      <SRS>EPSG:3101</SRS>' +
'      <SRS>EPSG:3102</SRS>' +
'      <SRS>EPSG:3103</SRS>' +
'      <SRS>EPSG:3104</SRS>' +
'      <SRS>EPSG:3105</SRS>' +
'      <SRS>EPSG:3106</SRS>' +
'      <SRS>EPSG:3107</SRS>' +
'      <SRS>EPSG:3108</SRS>' +
'      <SRS>EPSG:3109</SRS>' +
'      <SRS>EPSG:3110</SRS>' +
'      <SRS>EPSG:3111</SRS>' +
'      <SRS>EPSG:3112</SRS>' +
'      <SRS>EPSG:3113</SRS>' +
'      <SRS>EPSG:3114</SRS>' +
'      <SRS>EPSG:3115</SRS>' +
'      <SRS>EPSG:3116</SRS>' +
'      <SRS>EPSG:3117</SRS>' +
'      <SRS>EPSG:3118</SRS>' +
'      <SRS>EPSG:3119</SRS>' +
'      <SRS>EPSG:3120</SRS>' +
'      <SRS>EPSG:3121</SRS>' +
'      <SRS>EPSG:3122</SRS>' +
'      <SRS>EPSG:3123</SRS>' +
'      <SRS>EPSG:3124</SRS>' +
'      <SRS>EPSG:3125</SRS>' +
'      <SRS>EPSG:3126</SRS>' +
'      <SRS>EPSG:3127</SRS>' +
'      <SRS>EPSG:3128</SRS>' +
'      <SRS>EPSG:3129</SRS>' +
'      <SRS>EPSG:3130</SRS>' +
'      <SRS>EPSG:3131</SRS>' +
'      <SRS>EPSG:3132</SRS>' +
'      <SRS>EPSG:3133</SRS>' +
'      <SRS>EPSG:3134</SRS>' +
'      <SRS>EPSG:3135</SRS>' +
'      <SRS>EPSG:3136</SRS>' +
'      <SRS>EPSG:3137</SRS>' +
'      <SRS>EPSG:3138</SRS>' +
'      <SRS>EPSG:3139</SRS>' +
'      <SRS>EPSG:3140</SRS>' +
'      <SRS>EPSG:3141</SRS>' +
'      <SRS>EPSG:3142</SRS>' +
'      <SRS>EPSG:3143</SRS>' +
'      <SRS>EPSG:3144</SRS>' +
'      <SRS>EPSG:3145</SRS>' +
'      <SRS>EPSG:3146</SRS>' +
'      <SRS>EPSG:3147</SRS>' +
'      <SRS>EPSG:3148</SRS>' +
'      <SRS>EPSG:3149</SRS>' +
'      <SRS>EPSG:3150</SRS>' +
'      <SRS>EPSG:3151</SRS>' +
'      <SRS>EPSG:3152</SRS>' +
'      <SRS>EPSG:3153</SRS>' +
'      <SRS>EPSG:3154</SRS>' +
'      <SRS>EPSG:3155</SRS>' +
'      <SRS>EPSG:3156</SRS>' +
'      <SRS>EPSG:3157</SRS>' +
'      <SRS>EPSG:3158</SRS>' +
'      <SRS>EPSG:3159</SRS>' +
'      <SRS>EPSG:3160</SRS>' +
'      <SRS>EPSG:3161</SRS>' +
'      <SRS>EPSG:3162</SRS>' +
'      <SRS>EPSG:3163</SRS>' +
'      <SRS>EPSG:3164</SRS>' +
'      <SRS>EPSG:3165</SRS>' +
'      <SRS>EPSG:3166</SRS>' +
'      <SRS>EPSG:3167</SRS>' +
'      <SRS>EPSG:3168</SRS>' +
'      <SRS>EPSG:3169</SRS>' +
'      <SRS>EPSG:3170</SRS>' +
'      <SRS>EPSG:3171</SRS>' +
'      <SRS>EPSG:3172</SRS>' +
'      <SRS>EPSG:3173</SRS>' +
'      <SRS>EPSG:3174</SRS>' +
'      <SRS>EPSG:3175</SRS>' +
'      <SRS>EPSG:3176</SRS>' +
'      <SRS>EPSG:3177</SRS>' +
'      <SRS>EPSG:3178</SRS>' +
'      <SRS>EPSG:3179</SRS>' +
'      <SRS>EPSG:3180</SRS>' +
'      <SRS>EPSG:3181</SRS>' +
'      <SRS>EPSG:3182</SRS>' +
'      <SRS>EPSG:3183</SRS>' +
'      <SRS>EPSG:3184</SRS>' +
'      <SRS>EPSG:3185</SRS>' +
'      <SRS>EPSG:3186</SRS>' +
'      <SRS>EPSG:3187</SRS>' +
'      <SRS>EPSG:3188</SRS>' +
'      <SRS>EPSG:3189</SRS>' +
'      <SRS>EPSG:3190</SRS>' +
'      <SRS>EPSG:3191</SRS>' +
'      <SRS>EPSG:3192</SRS>' +
'      <SRS>EPSG:3193</SRS>' +
'      <SRS>EPSG:3194</SRS>' +
'      <SRS>EPSG:3195</SRS>' +
'      <SRS>EPSG:3196</SRS>' +
'      <SRS>EPSG:3197</SRS>' +
'      <SRS>EPSG:3198</SRS>' +
'      <SRS>EPSG:3199</SRS>' +
'      <SRS>EPSG:3200</SRS>' +
'      <SRS>EPSG:3201</SRS>' +
'      <SRS>EPSG:3202</SRS>' +
'      <SRS>EPSG:3203</SRS>' +
'      <SRS>EPSG:3204</SRS>' +
'      <SRS>EPSG:3205</SRS>' +
'      <SRS>EPSG:3206</SRS>' +
'      <SRS>EPSG:3207</SRS>' +
'      <SRS>EPSG:3208</SRS>' +
'      <SRS>EPSG:3209</SRS>' +
'      <SRS>EPSG:3210</SRS>' +
'      <SRS>EPSG:3211</SRS>' +
'      <SRS>EPSG:3212</SRS>' +
'      <SRS>EPSG:3213</SRS>' +
'      <SRS>EPSG:3214</SRS>' +
'      <SRS>EPSG:3215</SRS>' +
'      <SRS>EPSG:3216</SRS>' +
'      <SRS>EPSG:3217</SRS>' +
'      <SRS>EPSG:3218</SRS>' +
'      <SRS>EPSG:3219</SRS>' +
'      <SRS>EPSG:3220</SRS>' +
'      <SRS>EPSG:3221</SRS>' +
'      <SRS>EPSG:3222</SRS>' +
'      <SRS>EPSG:3223</SRS>' +
'      <SRS>EPSG:3224</SRS>' +
'      <SRS>EPSG:3225</SRS>' +
'      <SRS>EPSG:3226</SRS>' +
'      <SRS>EPSG:3227</SRS>' +
'      <SRS>EPSG:3228</SRS>' +
'      <SRS>EPSG:3229</SRS>' +
'      <SRS>EPSG:3230</SRS>' +
'      <SRS>EPSG:3231</SRS>' +
'      <SRS>EPSG:3232</SRS>' +
'      <SRS>EPSG:3233</SRS>' +
'      <SRS>EPSG:3234</SRS>' +
'      <SRS>EPSG:3235</SRS>' +
'      <SRS>EPSG:3236</SRS>' +
'      <SRS>EPSG:3237</SRS>' +
'      <SRS>EPSG:3238</SRS>' +
'      <SRS>EPSG:3239</SRS>' +
'      <SRS>EPSG:3240</SRS>' +
'      <SRS>EPSG:3241</SRS>' +
'      <SRS>EPSG:3242</SRS>' +
'      <SRS>EPSG:3243</SRS>' +
'      <SRS>EPSG:3244</SRS>' +
'      <SRS>EPSG:3245</SRS>' +
'      <SRS>EPSG:3246</SRS>' +
'      <SRS>EPSG:3247</SRS>' +
'      <SRS>EPSG:3248</SRS>' +
'      <SRS>EPSG:3249</SRS>' +
'      <SRS>EPSG:3250</SRS>' +
'      <SRS>EPSG:3251</SRS>' +
'      <SRS>EPSG:3252</SRS>' +
'      <SRS>EPSG:3253</SRS>' +
'      <SRS>EPSG:3254</SRS>' +
'      <SRS>EPSG:3255</SRS>' +
'      <SRS>EPSG:3256</SRS>' +
'      <SRS>EPSG:3257</SRS>' +
'      <SRS>EPSG:3258</SRS>' +
'      <SRS>EPSG:3259</SRS>' +
'      <SRS>EPSG:3260</SRS>' +
'      <SRS>EPSG:3261</SRS>' +
'      <SRS>EPSG:3262</SRS>' +
'      <SRS>EPSG:3263</SRS>' +
'      <SRS>EPSG:3264</SRS>' +
'      <SRS>EPSG:3265</SRS>' +
'      <SRS>EPSG:3266</SRS>' +
'      <SRS>EPSG:3267</SRS>' +
'      <SRS>EPSG:3268</SRS>' +
'      <SRS>EPSG:3269</SRS>' +
'      <SRS>EPSG:3270</SRS>' +
'      <SRS>EPSG:3271</SRS>' +
'      <SRS>EPSG:3272</SRS>' +
'      <SRS>EPSG:3273</SRS>' +
'      <SRS>EPSG:3274</SRS>' +
'      <SRS>EPSG:3275</SRS>' +
'      <SRS>EPSG:3276</SRS>' +
'      <SRS>EPSG:3277</SRS>' +
'      <SRS>EPSG:3278</SRS>' +
'      <SRS>EPSG:3279</SRS>' +
'      <SRS>EPSG:3280</SRS>' +
'      <SRS>EPSG:3281</SRS>' +
'      <SRS>EPSG:3282</SRS>' +
'      <SRS>EPSG:3283</SRS>' +
'      <SRS>EPSG:3284</SRS>' +
'      <SRS>EPSG:3285</SRS>' +
'      <SRS>EPSG:3286</SRS>' +
'      <SRS>EPSG:3287</SRS>' +
'      <SRS>EPSG:3288</SRS>' +
'      <SRS>EPSG:3289</SRS>' +
'      <SRS>EPSG:3290</SRS>' +
'      <SRS>EPSG:3291</SRS>' +
'      <SRS>EPSG:3292</SRS>' +
'      <SRS>EPSG:3293</SRS>' +
'      <SRS>EPSG:3294</SRS>' +
'      <SRS>EPSG:3295</SRS>' +
'      <SRS>EPSG:3296</SRS>' +
'      <SRS>EPSG:3297</SRS>' +
'      <SRS>EPSG:3298</SRS>' +
'      <SRS>EPSG:3299</SRS>' +
'      <SRS>EPSG:3300</SRS>' +
'      <SRS>EPSG:3301</SRS>' +
'      <SRS>EPSG:3302</SRS>' +
'      <SRS>EPSG:3303</SRS>' +
'      <SRS>EPSG:3304</SRS>' +
'      <SRS>EPSG:3305</SRS>' +
'      <SRS>EPSG:3306</SRS>' +
'      <SRS>EPSG:3307</SRS>' +
'      <SRS>EPSG:3308</SRS>' +
'      <SRS>EPSG:3309</SRS>' +
'      <SRS>EPSG:3310</SRS>' +
'      <SRS>EPSG:3311</SRS>' +
'      <SRS>EPSG:3312</SRS>' +
'      <SRS>EPSG:3313</SRS>' +
'      <SRS>EPSG:3314</SRS>' +
'      <SRS>EPSG:3315</SRS>' +
'      <SRS>EPSG:3316</SRS>' +
'      <SRS>EPSG:3317</SRS>' +
'      <SRS>EPSG:3318</SRS>' +
'      <SRS>EPSG:3319</SRS>' +
'      <SRS>EPSG:3320</SRS>' +
'      <SRS>EPSG:3321</SRS>' +
'      <SRS>EPSG:3322</SRS>' +
'      <SRS>EPSG:3323</SRS>' +
'      <SRS>EPSG:3324</SRS>' +
'      <SRS>EPSG:3325</SRS>' +
'      <SRS>EPSG:3326</SRS>' +
'      <SRS>EPSG:3327</SRS>' +
'      <SRS>EPSG:3328</SRS>' +
'      <SRS>EPSG:3329</SRS>' +
'      <SRS>EPSG:3330</SRS>' +
'      <SRS>EPSG:3331</SRS>' +
'      <SRS>EPSG:3332</SRS>' +
'      <SRS>EPSG:3333</SRS>' +
'      <SRS>EPSG:3334</SRS>' +
'      <SRS>EPSG:3335</SRS>' +
'      <SRS>EPSG:3336</SRS>' +
'      <SRS>EPSG:3337</SRS>' +
'      <SRS>EPSG:3338</SRS>' +
'      <SRS>EPSG:3339</SRS>' +
'      <SRS>EPSG:3340</SRS>' +
'      <SRS>EPSG:3341</SRS>' +
'      <SRS>EPSG:3342</SRS>' +
'      <SRS>EPSG:3343</SRS>' +
'      <SRS>EPSG:3344</SRS>' +
'      <SRS>EPSG:3345</SRS>' +
'      <SRS>EPSG:3346</SRS>' +
'      <SRS>EPSG:3347</SRS>' +
'      <SRS>EPSG:3348</SRS>' +
'      <SRS>EPSG:3349</SRS>' +
'      <SRS>EPSG:3350</SRS>' +
'      <SRS>EPSG:3351</SRS>' +
'      <SRS>EPSG:3352</SRS>' +
'      <SRS>EPSG:3353</SRS>' +
'      <SRS>EPSG:3354</SRS>' +
'      <SRS>EPSG:3355</SRS>' +
'      <SRS>EPSG:3356</SRS>' +
'      <SRS>EPSG:3357</SRS>' +
'      <SRS>EPSG:3358</SRS>' +
'      <SRS>EPSG:3359</SRS>' +
'      <SRS>EPSG:3360</SRS>' +
'      <SRS>EPSG:3361</SRS>' +
'      <SRS>EPSG:3362</SRS>' +
'      <SRS>EPSG:3363</SRS>' +
'      <SRS>EPSG:3364</SRS>' +
'      <SRS>EPSG:3365</SRS>' +
'      <SRS>EPSG:3366</SRS>' +
'      <SRS>EPSG:3367</SRS>' +
'      <SRS>EPSG:3368</SRS>' +
'      <SRS>EPSG:3369</SRS>' +
'      <SRS>EPSG:3370</SRS>' +
'      <SRS>EPSG:3371</SRS>' +
'      <SRS>EPSG:3372</SRS>' +
'      <SRS>EPSG:3373</SRS>' +
'      <SRS>EPSG:3374</SRS>' +
'      <SRS>EPSG:3375</SRS>' +
'      <SRS>EPSG:3376</SRS>' +
'      <SRS>EPSG:3377</SRS>' +
'      <SRS>EPSG:3378</SRS>' +
'      <SRS>EPSG:3379</SRS>' +
'      <SRS>EPSG:3380</SRS>' +
'      <SRS>EPSG:3381</SRS>' +
'      <SRS>EPSG:3382</SRS>' +
'      <SRS>EPSG:3383</SRS>' +
'      <SRS>EPSG:3384</SRS>' +
'      <SRS>EPSG:3385</SRS>' +
'      <SRS>EPSG:3386</SRS>' +
'      <SRS>EPSG:3387</SRS>' +
'      <SRS>EPSG:3388</SRS>' +
'      <SRS>EPSG:3389</SRS>' +
'      <SRS>EPSG:3390</SRS>' +
'      <SRS>EPSG:3391</SRS>' +
'      <SRS>EPSG:3392</SRS>' +
'      <SRS>EPSG:3393</SRS>' +
'      <SRS>EPSG:3394</SRS>' +
'      <SRS>EPSG:3395</SRS>' +
'      <SRS>EPSG:3396</SRS>' +
'      <SRS>EPSG:3397</SRS>' +
'      <SRS>EPSG:3398</SRS>' +
'      <SRS>EPSG:3399</SRS>' +
'      <SRS>EPSG:3400</SRS>' +
'      <SRS>EPSG:3401</SRS>' +
'      <SRS>EPSG:3402</SRS>' +
'      <SRS>EPSG:3403</SRS>' +
'      <SRS>EPSG:3404</SRS>' +
'      <SRS>EPSG:3405</SRS>' +
'      <SRS>EPSG:3406</SRS>' +
'      <SRS>EPSG:3407</SRS>' +
'      <SRS>EPSG:3408</SRS>' +
'      <SRS>EPSG:3409</SRS>' +
'      <SRS>EPSG:3410</SRS>' +
'      <SRS>EPSG:3411</SRS>' +
'      <SRS>EPSG:3412</SRS>' +
'      <SRS>EPSG:3413</SRS>' +
'      <SRS>EPSG:3414</SRS>' +
'      <SRS>EPSG:3415</SRS>' +
'      <SRS>EPSG:3416</SRS>' +
'      <SRS>EPSG:3417</SRS>' +
'      <SRS>EPSG:3418</SRS>' +
'      <SRS>EPSG:3419</SRS>' +
'      <SRS>EPSG:3420</SRS>' +
'      <SRS>EPSG:3421</SRS>' +
'      <SRS>EPSG:3422</SRS>' +
'      <SRS>EPSG:3423</SRS>' +
'      <SRS>EPSG:3424</SRS>' +
'      <SRS>EPSG:3425</SRS>' +
'      <SRS>EPSG:3426</SRS>' +
'      <SRS>EPSG:3427</SRS>' +
'      <SRS>EPSG:3428</SRS>' +
'      <SRS>EPSG:3429</SRS>' +
'      <SRS>EPSG:3430</SRS>' +
'      <SRS>EPSG:3431</SRS>' +
'      <SRS>EPSG:3432</SRS>' +
'      <SRS>EPSG:3433</SRS>' +
'      <SRS>EPSG:3434</SRS>' +
'      <SRS>EPSG:3435</SRS>' +
'      <SRS>EPSG:3436</SRS>' +
'      <SRS>EPSG:3437</SRS>' +
'      <SRS>EPSG:3438</SRS>' +
'      <SRS>EPSG:3439</SRS>' +
'      <SRS>EPSG:3440</SRS>' +
'      <SRS>EPSG:3441</SRS>' +
'      <SRS>EPSG:3442</SRS>' +
'      <SRS>EPSG:3443</SRS>' +
'      <SRS>EPSG:3444</SRS>' +
'      <SRS>EPSG:3445</SRS>' +
'      <SRS>EPSG:3446</SRS>' +
'      <SRS>EPSG:3447</SRS>' +
'      <SRS>EPSG:3448</SRS>' +
'      <SRS>EPSG:3449</SRS>' +
'      <SRS>EPSG:3450</SRS>' +
'      <SRS>EPSG:3451</SRS>' +
'      <SRS>EPSG:3452</SRS>' +
'      <SRS>EPSG:3453</SRS>' +
'      <SRS>EPSG:3454</SRS>' +
'      <SRS>EPSG:3455</SRS>' +
'      <SRS>EPSG:3456</SRS>' +
'      <SRS>EPSG:3457</SRS>' +
'      <SRS>EPSG:3458</SRS>' +
'      <SRS>EPSG:3459</SRS>' +
'      <SRS>EPSG:3460</SRS>' +
'      <SRS>EPSG:3461</SRS>' +
'      <SRS>EPSG:3462</SRS>' +
'      <SRS>EPSG:3463</SRS>' +
'      <SRS>EPSG:3464</SRS>' +
'      <SRS>EPSG:3560</SRS>' +
'      <SRS>EPSG:3561</SRS>' +
'      <SRS>EPSG:3562</SRS>' +
'      <SRS>EPSG:3563</SRS>' +
'      <SRS>EPSG:3564</SRS>' +
'      <SRS>EPSG:3565</SRS>' +
'      <SRS>EPSG:3566</SRS>' +
'      <SRS>EPSG:3567</SRS>' +
'      <SRS>EPSG:3568</SRS>' +
'      <SRS>EPSG:3569</SRS>' +
'      <SRS>EPSG:3570</SRS>' +
'      <SRS>EPSG:3571</SRS>' +
'      <SRS>EPSG:3572</SRS>' +
'      <SRS>EPSG:3573</SRS>' +
'      <SRS>EPSG:3574</SRS>' +
'      <SRS>EPSG:3575</SRS>' +
'      <SRS>EPSG:3576</SRS>' +
'      <SRS>EPSG:3577</SRS>' +
'      <SRS>EPSG:3920</SRS>' +
'      <SRS>EPSG:3991</SRS>' +
'      <SRS>EPSG:3992</SRS>' +
'      <SRS>EPSG:3993</SRS>' +
'      <SRS>EPSG:4001</SRS>' +
'      <SRS>EPSG:4002</SRS>' +
'      <SRS>EPSG:4003</SRS>' +
'      <SRS>EPSG:4004</SRS>' +
'      <SRS>EPSG:4005</SRS>' +
'      <SRS>EPSG:4006</SRS>' +
'      <SRS>EPSG:4007</SRS>' +
'      <SRS>EPSG:4008</SRS>' +
'      <SRS>EPSG:4009</SRS>' +
'      <SRS>EPSG:4010</SRS>' +
'      <SRS>EPSG:4011</SRS>' +
'      <SRS>EPSG:4012</SRS>' +
'      <SRS>EPSG:4013</SRS>' +
'      <SRS>EPSG:4014</SRS>' +
'      <SRS>EPSG:4015</SRS>' +
'      <SRS>EPSG:4016</SRS>' +
'      <SRS>EPSG:4018</SRS>' +
'      <SRS>EPSG:4019</SRS>' +
'      <SRS>EPSG:4020</SRS>' +
'      <SRS>EPSG:4021</SRS>' +
'      <SRS>EPSG:4022</SRS>' +
'      <SRS>EPSG:4024</SRS>' +
'      <SRS>EPSG:4025</SRS>' +
'      <SRS>EPSG:4027</SRS>' +
'      <SRS>EPSG:4028</SRS>' +
'      <SRS>EPSG:4029</SRS>' +
'      <SRS>EPSG:4030</SRS>' +
'      <SRS>EPSG:4031</SRS>' +
'      <SRS>EPSG:4032</SRS>' +
'      <SRS>EPSG:4033</SRS>' +
'      <SRS>EPSG:4034</SRS>' +
'      <SRS>EPSG:4035</SRS>' +
'      <SRS>EPSG:4036</SRS>' +
'      <SRS>EPSG:4041</SRS>' +
'      <SRS>EPSG:4042</SRS>' +
'      <SRS>EPSG:4043</SRS>' +
'      <SRS>EPSG:4044</SRS>' +
'      <SRS>EPSG:4045</SRS>' +
'      <SRS>EPSG:4047</SRS>' +
'      <SRS>EPSG:4052</SRS>' +
'      <SRS>EPSG:4053</SRS>' +
'      <SRS>EPSG:4054</SRS>' +
'      <SRS>EPSG:4120</SRS>' +
'      <SRS>EPSG:4121</SRS>' +
'      <SRS>EPSG:4122</SRS>' +
'      <SRS>EPSG:4123</SRS>' +
'      <SRS>EPSG:4124</SRS>' +
'      <SRS>EPSG:4125</SRS>' +
'      <SRS>EPSG:4126</SRS>' +
'      <SRS>EPSG:4127</SRS>' +
'      <SRS>EPSG:4128</SRS>' +
'      <SRS>EPSG:4129</SRS>' +
'      <SRS>EPSG:4130</SRS>' +
'      <SRS>EPSG:4131</SRS>' +
'      <SRS>EPSG:4132</SRS>' +
'      <SRS>EPSG:4133</SRS>' +
'      <SRS>EPSG:4134</SRS>' +
'      <SRS>EPSG:4135</SRS>' +
'      <SRS>EPSG:4136</SRS>' +
'      <SRS>EPSG:4137</SRS>' +
'      <SRS>EPSG:4138</SRS>' +
'      <SRS>EPSG:4139</SRS>' +
'      <SRS>EPSG:4140</SRS>' +
'      <SRS>EPSG:4141</SRS>' +
'      <SRS>EPSG:4142</SRS>' +
'      <SRS>EPSG:4143</SRS>' +
'      <SRS>EPSG:4144</SRS>' +
'      <SRS>EPSG:4145</SRS>' +
'      <SRS>EPSG:4146</SRS>' +
'      <SRS>EPSG:4147</SRS>' +
'      <SRS>EPSG:4148</SRS>' +
'      <SRS>EPSG:4149</SRS>' +
'      <SRS>EPSG:4150</SRS>' +
'      <SRS>EPSG:4151</SRS>' +
'      <SRS>EPSG:4152</SRS>' +
'      <SRS>EPSG:4153</SRS>' +
'      <SRS>EPSG:4154</SRS>' +
'      <SRS>EPSG:4155</SRS>' +
'      <SRS>EPSG:4156</SRS>' +
'      <SRS>EPSG:4157</SRS>' +
'      <SRS>EPSG:4158</SRS>' +
'      <SRS>EPSG:4159</SRS>' +
'      <SRS>EPSG:4160</SRS>' +
'      <SRS>EPSG:4161</SRS>' +
'      <SRS>EPSG:4162</SRS>' +
'      <SRS>EPSG:4163</SRS>' +
'      <SRS>EPSG:4164</SRS>' +
'      <SRS>EPSG:4165</SRS>' +
'      <SRS>EPSG:4166</SRS>' +
'      <SRS>EPSG:4167</SRS>' +
'      <SRS>EPSG:4168</SRS>' +
'      <SRS>EPSG:4169</SRS>' +
'      <SRS>EPSG:4170</SRS>' +
'      <SRS>EPSG:4171</SRS>' +
'      <SRS>EPSG:4172</SRS>' +
'      <SRS>EPSG:4173</SRS>' +
'      <SRS>EPSG:4174</SRS>' +
'      <SRS>EPSG:4175</SRS>' +
'      <SRS>EPSG:4176</SRS>' +
'      <SRS>EPSG:4178</SRS>' +
'      <SRS>EPSG:4179</SRS>' +
'      <SRS>EPSG:4180</SRS>' +
'      <SRS>EPSG:4181</SRS>' +
'      <SRS>EPSG:4182</SRS>' +
'      <SRS>EPSG:4183</SRS>' +
'      <SRS>EPSG:4184</SRS>' +
'      <SRS>EPSG:4185</SRS>' +
'      <SRS>EPSG:4188</SRS>' +
'      <SRS>EPSG:4189</SRS>' +
'      <SRS>EPSG:4190</SRS>' +
'      <SRS>EPSG:4191</SRS>' +
'      <SRS>EPSG:4192</SRS>' +
'      <SRS>EPSG:4193</SRS>' +
'      <SRS>EPSG:4194</SRS>' +
'      <SRS>EPSG:4195</SRS>' +
'      <SRS>EPSG:4196</SRS>' +
'      <SRS>EPSG:4197</SRS>' +
'      <SRS>EPSG:4198</SRS>' +
'      <SRS>EPSG:4199</SRS>' +
'      <SRS>EPSG:4200</SRS>' +
'      <SRS>EPSG:4201</SRS>' +
'      <SRS>EPSG:4202</SRS>' +
'      <SRS>EPSG:4203</SRS>' +
'      <SRS>EPSG:4204</SRS>' +
'      <SRS>EPSG:4205</SRS>' +
'      <SRS>EPSG:4206</SRS>' +
'      <SRS>EPSG:4207</SRS>' +
'      <SRS>EPSG:4208</SRS>' +
'      <SRS>EPSG:4209</SRS>' +
'      <SRS>EPSG:4210</SRS>' +
'      <SRS>EPSG:4211</SRS>' +
'      <SRS>EPSG:4212</SRS>' +
'      <SRS>EPSG:4213</SRS>' +
'      <SRS>EPSG:4214</SRS>' +
'      <SRS>EPSG:4215</SRS>' +
'      <SRS>EPSG:4216</SRS>' +
'      <SRS>EPSG:4218</SRS>' +
'      <SRS>EPSG:4219</SRS>' +
'      <SRS>EPSG:4220</SRS>' +
'      <SRS>EPSG:4221</SRS>' +
'      <SRS>EPSG:4222</SRS>' +
'      <SRS>EPSG:4223</SRS>' +
'      <SRS>EPSG:4224</SRS>' +
'      <SRS>EPSG:4225</SRS>' +
'      <SRS>EPSG:4226</SRS>' +
'      <SRS>EPSG:4227</SRS>' +
'      <SRS>EPSG:4228</SRS>' +
'      <SRS>EPSG:4229</SRS>' +
'      <SRS>EPSG:4230</SRS>' +
'      <SRS>EPSG:4231</SRS>' +
'      <SRS>EPSG:4232</SRS>' +
'      <SRS>EPSG:4233</SRS>' +
'      <SRS>EPSG:4234</SRS>' +
'      <SRS>EPSG:4235</SRS>' +
'      <SRS>EPSG:4236</SRS>' +
'      <SRS>EPSG:4237</SRS>' +
'      <SRS>EPSG:4238</SRS>' +
'      <SRS>EPSG:4239</SRS>' +
'      <SRS>EPSG:4240</SRS>' +
'      <SRS>EPSG:4241</SRS>' +
'      <SRS>EPSG:4242</SRS>' +
'      <SRS>EPSG:4243</SRS>' +
'      <SRS>EPSG:4244</SRS>' +
'      <SRS>EPSG:4245</SRS>' +
'      <SRS>EPSG:4246</SRS>' +
'      <SRS>EPSG:4247</SRS>' +
'      <SRS>EPSG:4248</SRS>' +
'      <SRS>EPSG:4249</SRS>' +
'      <SRS>EPSG:4250</SRS>' +
'      <SRS>EPSG:4251</SRS>' +
'      <SRS>EPSG:4252</SRS>' +
'      <SRS>EPSG:4253</SRS>' +
'      <SRS>EPSG:4254</SRS>' +
'      <SRS>EPSG:4255</SRS>' +
'      <SRS>EPSG:4256</SRS>' +
'      <SRS>EPSG:4257</SRS>' +
'      <SRS>EPSG:4258</SRS>' +
'      <SRS>EPSG:4259</SRS>' +
'      <SRS>EPSG:4260</SRS>' +
'      <SRS>EPSG:4261</SRS>' +
'      <SRS>EPSG:4262</SRS>' +
'      <SRS>EPSG:4263</SRS>' +
'      <SRS>EPSG:4264</SRS>' +
'      <SRS>EPSG:4265</SRS>' +
'      <SRS>EPSG:4266</SRS>' +
'      <SRS>EPSG:4267</SRS>' +
'      <SRS>EPSG:4268</SRS>' +
'      <SRS>EPSG:4269</SRS>' +
'      <SRS>EPSG:4270</SRS>' +
'      <SRS>EPSG:4271</SRS>' +
'      <SRS>EPSG:4272</SRS>' +
'      <SRS>EPSG:4273</SRS>' +
'      <SRS>EPSG:4274</SRS>' +
'      <SRS>EPSG:4275</SRS>' +
'      <SRS>EPSG:4276</SRS>' +
'      <SRS>EPSG:4277</SRS>' +
'      <SRS>EPSG:4278</SRS>' +
'      <SRS>EPSG:4279</SRS>' +
'      <SRS>EPSG:4280</SRS>' +
'      <SRS>EPSG:4281</SRS>' +
'      <SRS>EPSG:4282</SRS>' +
'      <SRS>EPSG:4283</SRS>' +
'      <SRS>EPSG:4284</SRS>' +
'      <SRS>EPSG:4285</SRS>' +
'      <SRS>EPSG:4286</SRS>' +
'      <SRS>EPSG:4287</SRS>' +
'      <SRS>EPSG:4288</SRS>' +
'      <SRS>EPSG:4289</SRS>' +
'      <SRS>EPSG:4291</SRS>' +
'      <SRS>EPSG:4292</SRS>' +
'      <SRS>EPSG:4293</SRS>' +
'      <SRS>EPSG:4294</SRS>' +
'      <SRS>EPSG:4295</SRS>' +
'      <SRS>EPSG:4296</SRS>' +
'      <SRS>EPSG:4297</SRS>' +
'      <SRS>EPSG:4298</SRS>' +
'      <SRS>EPSG:4299</SRS>' +
'      <SRS>EPSG:4300</SRS>' +
'      <SRS>EPSG:4301</SRS>' +
'      <SRS>EPSG:4302</SRS>' +
'      <SRS>EPSG:4303</SRS>' +
'      <SRS>EPSG:4304</SRS>' +
'      <SRS>EPSG:4306</SRS>' +
'      <SRS>EPSG:4307</SRS>' +
'      <SRS>EPSG:4308</SRS>' +
'      <SRS>EPSG:4309</SRS>' +
'      <SRS>EPSG:4310</SRS>' +
'      <SRS>EPSG:4311</SRS>' +
'      <SRS>EPSG:4312</SRS>' +
'      <SRS>EPSG:4313</SRS>' +
'      <SRS>EPSG:4314</SRS>' +
'      <SRS>EPSG:4315</SRS>' +
'      <SRS>EPSG:4316</SRS>' +
'      <SRS>EPSG:4317</SRS>' +
'      <SRS>EPSG:4318</SRS>' +
'      <SRS>EPSG:4319</SRS>' +
'      <SRS>EPSG:4322</SRS>' +
'      <SRS>EPSG:4324</SRS>' +
'      <SRS>EPSG:4326</SRS>' +
'      <SRS>EPSG:4327</SRS>' +
'      <SRS>EPSG:4328</SRS>' +
'      <SRS>EPSG:4329</SRS>' +
'      <SRS>EPSG:4330</SRS>' +
'      <SRS>EPSG:4331</SRS>' +
'      <SRS>EPSG:4332</SRS>' +
'      <SRS>EPSG:4333</SRS>' +
'      <SRS>EPSG:4334</SRS>' +
'      <SRS>EPSG:4335</SRS>' +
'      <SRS>EPSG:4336</SRS>' +
'      <SRS>EPSG:4337</SRS>' +
'      <SRS>EPSG:4338</SRS>' +
'      <SRS>EPSG:4339</SRS>' +
'      <SRS>EPSG:4340</SRS>' +
'      <SRS>EPSG:4341</SRS>' +
'      <SRS>EPSG:4342</SRS>' +
'      <SRS>EPSG:4343</SRS>' +
'      <SRS>EPSG:4344</SRS>' +
'      <SRS>EPSG:4345</SRS>' +
'      <SRS>EPSG:4346</SRS>' +
'      <SRS>EPSG:4347</SRS>' +
'      <SRS>EPSG:4348</SRS>' +
'      <SRS>EPSG:4349</SRS>' +
'      <SRS>EPSG:4350</SRS>' +
'      <SRS>EPSG:4351</SRS>' +
'      <SRS>EPSG:4352</SRS>' +
'      <SRS>EPSG:4353</SRS>' +
'      <SRS>EPSG:4354</SRS>' +
'      <SRS>EPSG:4355</SRS>' +
'      <SRS>EPSG:4356</SRS>' +
'      <SRS>EPSG:4357</SRS>' +
'      <SRS>EPSG:4358</SRS>' +
'      <SRS>EPSG:4359</SRS>' +
'      <SRS>EPSG:4360</SRS>' +
'      <SRS>EPSG:4361</SRS>' +
'      <SRS>EPSG:4362</SRS>' +
'      <SRS>EPSG:4363</SRS>' +
'      <SRS>EPSG:4364</SRS>' +
'      <SRS>EPSG:4365</SRS>' +
'      <SRS>EPSG:4366</SRS>' +
'      <SRS>EPSG:4367</SRS>' +
'      <SRS>EPSG:4368</SRS>' +
'      <SRS>EPSG:4369</SRS>' +
'      <SRS>EPSG:4370</SRS>' +
'      <SRS>EPSG:4371</SRS>' +
'      <SRS>EPSG:4372</SRS>' +
'      <SRS>EPSG:4373</SRS>' +
'      <SRS>EPSG:4374</SRS>' +
'      <SRS>EPSG:4375</SRS>' +
'      <SRS>EPSG:4376</SRS>' +
'      <SRS>EPSG:4377</SRS>' +
'      <SRS>EPSG:4378</SRS>' +
'      <SRS>EPSG:4379</SRS>' +
'      <SRS>EPSG:4380</SRS>' +
'      <SRS>EPSG:4381</SRS>' +
'      <SRS>EPSG:4382</SRS>' +
'      <SRS>EPSG:4383</SRS>' +
'      <SRS>EPSG:4384</SRS>' +
'      <SRS>EPSG:4385</SRS>' +
'      <SRS>EPSG:4386</SRS>' +
'      <SRS>EPSG:4387</SRS>' +
'      <SRS>EPSG:4388</SRS>' +
'      <SRS>EPSG:4389</SRS>' +
'      <SRS>EPSG:4600</SRS>' +
'      <SRS>EPSG:4601</SRS>' +
'      <SRS>EPSG:4602</SRS>' +
'      <SRS>EPSG:4603</SRS>' +
'      <SRS>EPSG:4604</SRS>' +
'      <SRS>EPSG:4605</SRS>' +
'      <SRS>EPSG:4606</SRS>' +
'      <SRS>EPSG:4607</SRS>' +
'      <SRS>EPSG:4608</SRS>' +
'      <SRS>EPSG:4609</SRS>' +
'      <SRS>EPSG:4610</SRS>' +
'      <SRS>EPSG:4611</SRS>' +
'      <SRS>EPSG:4612</SRS>' +
'      <SRS>EPSG:4613</SRS>' +
'      <SRS>EPSG:4614</SRS>' +
'      <SRS>EPSG:4615</SRS>' +
'      <SRS>EPSG:4616</SRS>' +
'      <SRS>EPSG:4617</SRS>' +
'      <SRS>EPSG:4618</SRS>' +
'      <SRS>EPSG:4619</SRS>' +
'      <SRS>EPSG:4620</SRS>' +
'      <SRS>EPSG:4621</SRS>' +
'      <SRS>EPSG:4622</SRS>' +
'      <SRS>EPSG:4623</SRS>' +
'      <SRS>EPSG:4624</SRS>' +
'      <SRS>EPSG:4625</SRS>' +
'      <SRS>EPSG:4626</SRS>' +
'      <SRS>EPSG:4627</SRS>' +
'      <SRS>EPSG:4628</SRS>' +
'      <SRS>EPSG:4629</SRS>' +
'      <SRS>EPSG:4630</SRS>' +
'      <SRS>EPSG:4631</SRS>' +
'      <SRS>EPSG:4632</SRS>' +
'      <SRS>EPSG:4633</SRS>' +
'      <SRS>EPSG:4634</SRS>' +
'      <SRS>EPSG:4635</SRS>' +
'      <SRS>EPSG:4636</SRS>' +
'      <SRS>EPSG:4637</SRS>' +
'      <SRS>EPSG:4638</SRS>' +
'      <SRS>EPSG:4639</SRS>' +
'      <SRS>EPSG:4640</SRS>' +
'      <SRS>EPSG:4641</SRS>' +
'      <SRS>EPSG:4642</SRS>' +
'      <SRS>EPSG:4643</SRS>' +
'      <SRS>EPSG:4644</SRS>' +
'      <SRS>EPSG:4645</SRS>' +
'      <SRS>EPSG:4646</SRS>' +
'      <SRS>EPSG:4657</SRS>' +
'      <SRS>EPSG:4658</SRS>' +
'      <SRS>EPSG:4659</SRS>' +
'      <SRS>EPSG:4660</SRS>' +
'      <SRS>EPSG:4661</SRS>' +
'      <SRS>EPSG:4662</SRS>' +
'      <SRS>EPSG:4663</SRS>' +
'      <SRS>EPSG:4664</SRS>' +
'      <SRS>EPSG:4665</SRS>' +
'      <SRS>EPSG:4666</SRS>' +
'      <SRS>EPSG:4667</SRS>' +
'      <SRS>EPSG:4668</SRS>' +
'      <SRS>EPSG:4669</SRS>' +
'      <SRS>EPSG:4670</SRS>' +
'      <SRS>EPSG:4671</SRS>' +
'      <SRS>EPSG:4672</SRS>' +
'      <SRS>EPSG:4673</SRS>' +
'      <SRS>EPSG:4674</SRS>' +
'      <SRS>EPSG:4675</SRS>' +
'      <SRS>EPSG:4676</SRS>' +
'      <SRS>EPSG:4677</SRS>' +
'      <SRS>EPSG:4678</SRS>' +
'      <SRS>EPSG:4679</SRS>' +
'      <SRS>EPSG:4680</SRS>' +
'      <SRS>EPSG:4681</SRS>' +
'      <SRS>EPSG:4682</SRS>' +
'      <SRS>EPSG:4683</SRS>' +
'      <SRS>EPSG:4684</SRS>' +
'      <SRS>EPSG:4685</SRS>' +
'      <SRS>EPSG:4686</SRS>' +
'      <SRS>EPSG:4687</SRS>' +
'      <SRS>EPSG:4688</SRS>' +
'      <SRS>EPSG:4689</SRS>' +
'      <SRS>EPSG:4690</SRS>' +
'      <SRS>EPSG:4691</SRS>' +
'      <SRS>EPSG:4692</SRS>' +
'      <SRS>EPSG:4693</SRS>' +
'      <SRS>EPSG:4694</SRS>' +
'      <SRS>EPSG:4695</SRS>' +
'      <SRS>EPSG:4696</SRS>' +
'      <SRS>EPSG:4697</SRS>' +
'      <SRS>EPSG:4698</SRS>' +
'      <SRS>EPSG:4699</SRS>' +
'      <SRS>EPSG:4700</SRS>' +
'      <SRS>EPSG:4701</SRS>' +
'      <SRS>EPSG:4702</SRS>' +
'      <SRS>EPSG:4703</SRS>' +
'      <SRS>EPSG:4704</SRS>' +
'      <SRS>EPSG:4705</SRS>' +
'      <SRS>EPSG:4706</SRS>' +
'      <SRS>EPSG:4707</SRS>' +
'      <SRS>EPSG:4708</SRS>' +
'      <SRS>EPSG:4709</SRS>' +
'      <SRS>EPSG:4710</SRS>' +
'      <SRS>EPSG:4711</SRS>' +
'      <SRS>EPSG:4712</SRS>' +
'      <SRS>EPSG:4713</SRS>' +
'      <SRS>EPSG:4714</SRS>' +
'      <SRS>EPSG:4715</SRS>' +
'      <SRS>EPSG:4716</SRS>' +
'      <SRS>EPSG:4717</SRS>' +
'      <SRS>EPSG:4718</SRS>' +
'      <SRS>EPSG:4719</SRS>' +
'      <SRS>EPSG:4720</SRS>' +
'      <SRS>EPSG:4721</SRS>' +
'      <SRS>EPSG:4722</SRS>' +
'      <SRS>EPSG:4723</SRS>' +
'      <SRS>EPSG:4724</SRS>' +
'      <SRS>EPSG:4725</SRS>' +
'      <SRS>EPSG:4726</SRS>' +
'      <SRS>EPSG:4727</SRS>' +
'      <SRS>EPSG:4728</SRS>' +
'      <SRS>EPSG:4729</SRS>' +
'      <SRS>EPSG:4730</SRS>' +
'      <SRS>EPSG:4731</SRS>' +
'      <SRS>EPSG:4732</SRS>' +
'      <SRS>EPSG:4733</SRS>' +
'      <SRS>EPSG:4734</SRS>' +
'      <SRS>EPSG:4735</SRS>' +
'      <SRS>EPSG:4736</SRS>' +
'      <SRS>EPSG:4737</SRS>' +
'      <SRS>EPSG:4738</SRS>' +
'      <SRS>EPSG:4739</SRS>' +
'      <SRS>EPSG:4740</SRS>' +
'      <SRS>EPSG:4741</SRS>' +
'      <SRS>EPSG:4742</SRS>' +
'      <SRS>EPSG:4743</SRS>' +
'      <SRS>EPSG:4744</SRS>' +
'      <SRS>EPSG:4745</SRS>' +
'      <SRS>EPSG:4746</SRS>' +
'      <SRS>EPSG:4747</SRS>' +
'      <SRS>EPSG:4748</SRS>' +
'      <SRS>EPSG:4749</SRS>' +
'      <SRS>EPSG:4750</SRS>' +
'      <SRS>EPSG:4751</SRS>' +
'      <SRS>EPSG:4752</SRS>' +
'      <SRS>EPSG:4753</SRS>' +
'      <SRS>EPSG:4754</SRS>' +
'      <SRS>EPSG:4755</SRS>' +
'      <SRS>EPSG:4756</SRS>' +
'      <SRS>EPSG:4757</SRS>' +
'      <SRS>EPSG:4758</SRS>' +
'      <SRS>EPSG:4801</SRS>' +
'      <SRS>EPSG:4802</SRS>' +
'      <SRS>EPSG:4803</SRS>' +
'      <SRS>EPSG:4804</SRS>' +
'      <SRS>EPSG:4805</SRS>' +
'      <SRS>EPSG:4806</SRS>' +
'      <SRS>EPSG:4807</SRS>' +
'      <SRS>EPSG:4808</SRS>' +
'      <SRS>EPSG:4809</SRS>' +
'      <SRS>EPSG:4810</SRS>' +
'      <SRS>EPSG:4811</SRS>' +
'      <SRS>EPSG:4813</SRS>' +
'      <SRS>EPSG:4814</SRS>' +
'      <SRS>EPSG:4815</SRS>' +
'      <SRS>EPSG:4816</SRS>' +
'      <SRS>EPSG:4817</SRS>' +
'      <SRS>EPSG:4818</SRS>' +
'      <SRS>EPSG:4819</SRS>' +
'      <SRS>EPSG:4820</SRS>' +
'      <SRS>EPSG:4821</SRS>' +
'      <SRS>EPSG:4894</SRS>' +
'      <SRS>EPSG:4895</SRS>' +
'      <SRS>EPSG:4896</SRS>' +
'      <SRS>EPSG:4897</SRS>' +
'      <SRS>EPSG:4898</SRS>' +
'      <SRS>EPSG:4899</SRS>' +
'      <SRS>EPSG:4900</SRS>' +
'      <SRS>EPSG:4901</SRS>' +
'      <SRS>EPSG:4902</SRS>' +
'      <SRS>EPSG:4903</SRS>' +
'      <SRS>EPSG:4904</SRS>' +
'      <SRS>EPSG:4906</SRS>' +
'      <SRS>EPSG:4907</SRS>' +
'      <SRS>EPSG:4908</SRS>' +
'      <SRS>EPSG:4909</SRS>' +
'      <SRS>EPSG:4910</SRS>' +
'      <SRS>EPSG:4911</SRS>' +
'      <SRS>EPSG:4912</SRS>' +
'      <SRS>EPSG:4913</SRS>' +
'      <SRS>EPSG:4914</SRS>' +
'      <SRS>EPSG:4915</SRS>' +
'      <SRS>EPSG:4916</SRS>' +
'      <SRS>EPSG:4917</SRS>' +
'      <SRS>EPSG:4918</SRS>' +
'      <SRS>EPSG:4919</SRS>' +
'      <SRS>EPSG:4920</SRS>' +
'      <SRS>EPSG:4921</SRS>' +
'      <SRS>EPSG:4922</SRS>' +
'      <SRS>EPSG:4923</SRS>' +
'      <SRS>EPSG:4924</SRS>' +
'      <SRS>EPSG:4925</SRS>' +
'      <SRS>EPSG:4926</SRS>' +
'      <SRS>EPSG:4927</SRS>' +
'      <SRS>EPSG:4928</SRS>' +
'      <SRS>EPSG:4929</SRS>' +
'      <SRS>EPSG:4930</SRS>' +
'      <SRS>EPSG:4931</SRS>' +
'      <SRS>EPSG:4932</SRS>' +
'      <SRS>EPSG:4933</SRS>' +
'      <SRS>EPSG:4934</SRS>' +
'      <SRS>EPSG:4935</SRS>' +
'      <SRS>EPSG:4936</SRS>' +
'      <SRS>EPSG:4937</SRS>' +
'      <SRS>EPSG:4938</SRS>' +
'      <SRS>EPSG:4939</SRS>' +
'      <SRS>EPSG:4940</SRS>' +
'      <SRS>EPSG:4941</SRS>' +
'      <SRS>EPSG:4942</SRS>' +
'      <SRS>EPSG:4943</SRS>' +
'      <SRS>EPSG:4944</SRS>' +
'      <SRS>EPSG:4945</SRS>' +
'      <SRS>EPSG:4946</SRS>' +
'      <SRS>EPSG:4947</SRS>' +
'      <SRS>EPSG:4948</SRS>' +
'      <SRS>EPSG:4949</SRS>' +
'      <SRS>EPSG:4950</SRS>' +
'      <SRS>EPSG:4951</SRS>' +
'      <SRS>EPSG:4952</SRS>' +
'      <SRS>EPSG:4953</SRS>' +
'      <SRS>EPSG:4954</SRS>' +
'      <SRS>EPSG:4955</SRS>' +
'      <SRS>EPSG:4956</SRS>' +
'      <SRS>EPSG:4957</SRS>' +
'      <SRS>EPSG:4958</SRS>' +
'      <SRS>EPSG:4959</SRS>' +
'      <SRS>EPSG:4960</SRS>' +
'      <SRS>EPSG:4961</SRS>' +
'      <SRS>EPSG:4962</SRS>' +
'      <SRS>EPSG:4963</SRS>' +
'      <SRS>EPSG:4964</SRS>' +
'      <SRS>EPSG:4965</SRS>' +
'      <SRS>EPSG:4966</SRS>' +
'      <SRS>EPSG:4967</SRS>' +
'      <SRS>EPSG:4968</SRS>' +
'      <SRS>EPSG:4969</SRS>' +
'      <SRS>EPSG:4970</SRS>' +
'      <SRS>EPSG:4971</SRS>' +
'      <SRS>EPSG:4972</SRS>' +
'      <SRS>EPSG:4973</SRS>' +
'      <SRS>EPSG:4974</SRS>' +
'      <SRS>EPSG:4975</SRS>' +
'      <SRS>EPSG:4976</SRS>' +
'      <SRS>EPSG:4977</SRS>' +
'      <SRS>EPSG:4978</SRS>' +
'      <SRS>EPSG:4979</SRS>' +
'      <SRS>EPSG:4980</SRS>' +
'      <SRS>EPSG:4981</SRS>' +
'      <SRS>EPSG:4982</SRS>' +
'      <SRS>EPSG:4983</SRS>' +
'      <SRS>EPSG:4984</SRS>' +
'      <SRS>EPSG:4985</SRS>' +
'      <SRS>EPSG:4986</SRS>' +
'      <SRS>EPSG:4987</SRS>' +
'      <SRS>EPSG:4988</SRS>' +
'      <SRS>EPSG:4989</SRS>' +
'      <SRS>EPSG:4990</SRS>' +
'      <SRS>EPSG:4991</SRS>' +
'      <SRS>EPSG:4992</SRS>' +
'      <SRS>EPSG:4993</SRS>' +
'      <SRS>EPSG:4994</SRS>' +
'      <SRS>EPSG:4995</SRS>' +
'      <SRS>EPSG:4996</SRS>' +
'      <SRS>EPSG:4997</SRS>' +
'      <SRS>EPSG:4998</SRS>' +
'      <SRS>EPSG:4999</SRS>' +
'      <SRS>EPSG:5600</SRS>' +
'      <SRS>EPSG:5601</SRS>' +
'      <SRS>EPSG:5602</SRS>' +
'      <SRS>EPSG:5603</SRS>' +
'      <SRS>EPSG:5604</SRS>' +
'      <SRS>EPSG:5605</SRS>' +
'      <SRS>EPSG:5606</SRS>' +
'      <SRS>EPSG:5607</SRS>' +
'      <SRS>EPSG:5608</SRS>' +
'      <SRS>EPSG:5609</SRS>' +
'      <SRS>EPSG:5701</SRS>' +
'      <SRS>EPSG:5702</SRS>' +
'      <SRS>EPSG:5703</SRS>' +
'      <SRS>EPSG:5704</SRS>' +
'      <SRS>EPSG:5705</SRS>' +
'      <SRS>EPSG:5706</SRS>' +
'      <SRS>EPSG:5709</SRS>' +
'      <SRS>EPSG:5710</SRS>' +
'      <SRS>EPSG:5711</SRS>' +
'      <SRS>EPSG:5712</SRS>' +
'      <SRS>EPSG:5713</SRS>' +
'      <SRS>EPSG:5714</SRS>' +
'      <SRS>EPSG:5715</SRS>' +
'      <SRS>EPSG:5716</SRS>' +
'      <SRS>EPSG:5717</SRS>' +
'      <SRS>EPSG:5718</SRS>' +
'      <SRS>EPSG:5719</SRS>' +
'      <SRS>EPSG:5720</SRS>' +
'      <SRS>EPSG:5721</SRS>' +
'      <SRS>EPSG:5722</SRS>' +
'      <SRS>EPSG:5723</SRS>' +
'      <SRS>EPSG:5724</SRS>' +
'      <SRS>EPSG:5725</SRS>' +
'      <SRS>EPSG:5726</SRS>' +
'      <SRS>EPSG:5727</SRS>' +
'      <SRS>EPSG:5728</SRS>' +
'      <SRS>EPSG:5729</SRS>' +
'      <SRS>EPSG:5730</SRS>' +
'      <SRS>EPSG:5731</SRS>' +
'      <SRS>EPSG:5732</SRS>' +
'      <SRS>EPSG:5733</SRS>' +
'      <SRS>EPSG:5734</SRS>' +
'      <SRS>EPSG:5735</SRS>' +
'      <SRS>EPSG:5736</SRS>' +
'      <SRS>EPSG:5737</SRS>' +
'      <SRS>EPSG:5738</SRS>' +
'      <SRS>EPSG:5739</SRS>' +
'      <SRS>EPSG:5740</SRS>' +
'      <SRS>EPSG:5741</SRS>' +
'      <SRS>EPSG:5742</SRS>' +
'      <SRS>EPSG:5743</SRS>' +
'      <SRS>EPSG:5744</SRS>' +
'      <SRS>EPSG:5745</SRS>' +
'      <SRS>EPSG:5746</SRS>' +
'      <SRS>EPSG:5747</SRS>' +
'      <SRS>EPSG:5748</SRS>' +
'      <SRS>EPSG:5749</SRS>' +
'      <SRS>EPSG:5750</SRS>' +
'      <SRS>EPSG:5751</SRS>' +
'      <SRS>EPSG:5752</SRS>' +
'      <SRS>EPSG:5753</SRS>' +
'      <SRS>EPSG:5754</SRS>' +
'      <SRS>EPSG:5755</SRS>' +
'      <SRS>EPSG:5756</SRS>' +
'      <SRS>EPSG:5757</SRS>' +
'      <SRS>EPSG:5758</SRS>' +
'      <SRS>EPSG:5759</SRS>' +
'      <SRS>EPSG:5760</SRS>' +
'      <SRS>EPSG:5761</SRS>' +
'      <SRS>EPSG:5762</SRS>' +
'      <SRS>EPSG:5763</SRS>' +
'      <SRS>EPSG:5764</SRS>' +
'      <SRS>EPSG:5765</SRS>' +
'      <SRS>EPSG:5766</SRS>' +
'      <SRS>EPSG:5767</SRS>' +
'      <SRS>EPSG:5768</SRS>' +
'      <SRS>EPSG:5769</SRS>' +
'      <SRS>EPSG:5770</SRS>' +
'      <SRS>EPSG:5771</SRS>' +
'      <SRS>EPSG:5772</SRS>' +
'      <SRS>EPSG:5773</SRS>' +
'      <SRS>EPSG:5774</SRS>' +
'      <SRS>EPSG:5775</SRS>' +
'      <SRS>EPSG:5776</SRS>' +
'      <SRS>EPSG:5777</SRS>' +
'      <SRS>EPSG:5778</SRS>' +
'      <SRS>EPSG:5779</SRS>' +
'      <SRS>EPSG:5780</SRS>' +
'      <SRS>EPSG:5781</SRS>' +
'      <SRS>EPSG:5782</SRS>' +
'      <SRS>EPSG:5783</SRS>' +
'      <SRS>EPSG:5784</SRS>' +
'      <SRS>EPSG:5785</SRS>' +
'      <SRS>EPSG:5786</SRS>' +
'      <SRS>EPSG:5787</SRS>' +
'      <SRS>EPSG:5788</SRS>' +
'      <SRS>EPSG:5789</SRS>' +
'      <SRS>EPSG:5790</SRS>' +
'      <SRS>EPSG:5791</SRS>' +
'      <SRS>EPSG:5792</SRS>' +
'      <SRS>EPSG:5793</SRS>' +
'      <SRS>EPSG:5794</SRS>' +
'      <SRS>EPSG:5795</SRS>' +
'      <SRS>EPSG:5796</SRS>' +
'      <SRS>EPSG:5797</SRS>' +
'      <SRS>EPSG:5798</SRS>' +
'      <SRS>EPSG:5799</SRS>' +
'      <SRS>EPSG:5800</SRS>' +
'      <SRS>EPSG:5801</SRS>' +
'      <SRS>EPSG:5802</SRS>' +
'      <SRS>EPSG:5803</SRS>' +
'      <SRS>EPSG:5804</SRS>' +
'      <SRS>EPSG:5805</SRS>' +
'      <SRS>EPSG:5806</SRS>' +
'      <SRS>EPSG:5807</SRS>' +
'      <SRS>EPSG:5808</SRS>' +
'      <SRS>EPSG:5809</SRS>' +
'      <SRS>EPSG:5810</SRS>' +
'      <SRS>EPSG:5811</SRS>' +
'      <SRS>EPSG:5812</SRS>' +
'      <SRS>EPSG:5813</SRS>' +
'      <SRS>EPSG:5814</SRS>' +
'      <SRS>EPSG:5815</SRS>' +
'      <SRS>EPSG:5816</SRS>' +
'      <SRS>EPSG:5817</SRS>' +
'      <SRS>EPSG:5818</SRS>' +
'      <SRS>EPSG:7400</SRS>' +
'      <SRS>EPSG:7401</SRS>' +
'      <SRS>EPSG:7402</SRS>' +
'      <SRS>EPSG:7403</SRS>' +
'      <SRS>EPSG:7404</SRS>' +
'      <SRS>EPSG:7405</SRS>' +
'      <SRS>EPSG:7406</SRS>' +
'      <SRS>EPSG:7407</SRS>' +
'      <SRS>EPSG:7408</SRS>' +
'      <SRS>EPSG:7409</SRS>' +
'      <SRS>EPSG:7410</SRS>' +
'      <SRS>EPSG:7411</SRS>' +
'      <SRS>EPSG:7412</SRS>' +
'      <SRS>EPSG:7413</SRS>' +
'      <SRS>EPSG:7414</SRS>' +
'      <SRS>EPSG:7415</SRS>' +
'      <SRS>EPSG:7416</SRS>' +
'      <SRS>EPSG:7417</SRS>' +
'      <SRS>EPSG:7418</SRS>' +
'      <SRS>EPSG:7419</SRS>' +
'      <SRS>EPSG:7420</SRS>' +
'      <SRS>EPSG:20004</SRS>' +
'      <SRS>EPSG:20005</SRS>' +
'      <SRS>EPSG:20006</SRS>' +
'      <SRS>EPSG:20007</SRS>' +
'      <SRS>EPSG:20008</SRS>' +
'      <SRS>EPSG:20009</SRS>' +
'      <SRS>EPSG:20010</SRS>' +
'      <SRS>EPSG:20011</SRS>' +
'      <SRS>EPSG:20012</SRS>' +
'      <SRS>EPSG:20013</SRS>' +
'      <SRS>EPSG:20014</SRS>' +
'      <SRS>EPSG:20015</SRS>' +
'      <SRS>EPSG:20016</SRS>' +
'      <SRS>EPSG:20017</SRS>' +
'      <SRS>EPSG:20018</SRS>' +
'      <SRS>EPSG:20019</SRS>' +
'      <SRS>EPSG:20020</SRS>' +
'      <SRS>EPSG:20021</SRS>' +
'      <SRS>EPSG:20022</SRS>' +
'      <SRS>EPSG:20023</SRS>' +
'      <SRS>EPSG:20024</SRS>' +
'      <SRS>EPSG:20025</SRS>' +
'      <SRS>EPSG:20026</SRS>' +
'      <SRS>EPSG:20027</SRS>' +
'      <SRS>EPSG:20028</SRS>' +
'      <SRS>EPSG:20029</SRS>' +
'      <SRS>EPSG:20030</SRS>' +
'      <SRS>EPSG:20031</SRS>' +
'      <SRS>EPSG:20032</SRS>' +
'      <SRS>EPSG:20064</SRS>' +
'      <SRS>EPSG:20065</SRS>' +
'      <SRS>EPSG:20066</SRS>' +
'      <SRS>EPSG:20067</SRS>' +
'      <SRS>EPSG:20068</SRS>' +
'      <SRS>EPSG:20069</SRS>' +
'      <SRS>EPSG:20070</SRS>' +
'      <SRS>EPSG:20071</SRS>' +
'      <SRS>EPSG:20072</SRS>' +
'      <SRS>EPSG:20073</SRS>' +
'      <SRS>EPSG:20074</SRS>' +
'      <SRS>EPSG:20075</SRS>' +
'      <SRS>EPSG:20076</SRS>' +
'      <SRS>EPSG:20077</SRS>' +
'      <SRS>EPSG:20078</SRS>' +
'      <SRS>EPSG:20079</SRS>' +
'      <SRS>EPSG:20080</SRS>' +
'      <SRS>EPSG:20081</SRS>' +
'      <SRS>EPSG:20082</SRS>' +
'      <SRS>EPSG:20083</SRS>' +
'      <SRS>EPSG:20084</SRS>' +
'      <SRS>EPSG:20085</SRS>' +
'      <SRS>EPSG:20086</SRS>' +
'      <SRS>EPSG:20087</SRS>' +
'      <SRS>EPSG:20088</SRS>' +
'      <SRS>EPSG:20089</SRS>' +
'      <SRS>EPSG:20090</SRS>' +
'      <SRS>EPSG:20091</SRS>' +
'      <SRS>EPSG:20092</SRS>' +
'      <SRS>EPSG:20135</SRS>' +
'      <SRS>EPSG:20136</SRS>' +
'      <SRS>EPSG:20137</SRS>' +
'      <SRS>EPSG:20138</SRS>' +
'      <SRS>EPSG:20248</SRS>' +
'      <SRS>EPSG:20249</SRS>' +
'      <SRS>EPSG:20250</SRS>' +
'      <SRS>EPSG:20251</SRS>' +
'      <SRS>EPSG:20252</SRS>' +
'      <SRS>EPSG:20253</SRS>' +
'      <SRS>EPSG:20254</SRS>' +
'      <SRS>EPSG:20255</SRS>' +
'      <SRS>EPSG:20256</SRS>' +
'      <SRS>EPSG:20257</SRS>' +
'      <SRS>EPSG:20258</SRS>' +
'      <SRS>EPSG:20348</SRS>' +
'      <SRS>EPSG:20349</SRS>' +
'      <SRS>EPSG:20350</SRS>' +
'      <SRS>EPSG:20351</SRS>' +
'      <SRS>EPSG:20352</SRS>' +
'      <SRS>EPSG:20353</SRS>' +
'      <SRS>EPSG:20354</SRS>' +
'      <SRS>EPSG:20355</SRS>' +
'      <SRS>EPSG:20356</SRS>' +
'      <SRS>EPSG:20357</SRS>' +
'      <SRS>EPSG:20358</SRS>' +
'      <SRS>EPSG:20436</SRS>' +
'      <SRS>EPSG:20437</SRS>' +
'      <SRS>EPSG:20438</SRS>' +
'      <SRS>EPSG:20439</SRS>' +
'      <SRS>EPSG:20440</SRS>' +
'      <SRS>EPSG:20499</SRS>' +
'      <SRS>EPSG:20538</SRS>' +
'      <SRS>EPSG:20539</SRS>' +
'      <SRS>EPSG:20790</SRS>' +
'      <SRS>EPSG:20791</SRS>' +
'      <SRS>EPSG:20822</SRS>' +
'      <SRS>EPSG:20823</SRS>' +
'      <SRS>EPSG:20824</SRS>' +
'      <SRS>EPSG:20934</SRS>' +
'      <SRS>EPSG:20935</SRS>' +
'      <SRS>EPSG:20936</SRS>' +
'      <SRS>EPSG:21035</SRS>' +
'      <SRS>EPSG:21036</SRS>' +
'      <SRS>EPSG:21037</SRS>' +
'      <SRS>EPSG:21095</SRS>' +
'      <SRS>EPSG:21096</SRS>' +
'      <SRS>EPSG:21097</SRS>' +
'      <SRS>EPSG:21100</SRS>' +
'      <SRS>EPSG:21148</SRS>' +
'      <SRS>EPSG:21149</SRS>' +
'      <SRS>EPSG:21150</SRS>' +
'      <SRS>EPSG:21291</SRS>' +
'      <SRS>EPSG:21292</SRS>' +
'      <SRS>EPSG:21413</SRS>' +
'      <SRS>EPSG:21414</SRS>' +
'      <SRS>EPSG:21415</SRS>' +
'      <SRS>EPSG:21416</SRS>' +
'      <SRS>EPSG:21417</SRS>' +
'      <SRS>EPSG:21418</SRS>' +
'      <SRS>EPSG:21419</SRS>' +
'      <SRS>EPSG:21420</SRS>' +
'      <SRS>EPSG:21421</SRS>' +
'      <SRS>EPSG:21422</SRS>' +
'      <SRS>EPSG:21423</SRS>' +
'      <SRS>EPSG:21453</SRS>' +
'      <SRS>EPSG:21454</SRS>' +
'      <SRS>EPSG:21455</SRS>' +
'      <SRS>EPSG:21456</SRS>' +
'      <SRS>EPSG:21457</SRS>' +
'      <SRS>EPSG:21458</SRS>' +
'      <SRS>EPSG:21459</SRS>' +
'      <SRS>EPSG:21460</SRS>' +
'      <SRS>EPSG:21461</SRS>' +
'      <SRS>EPSG:21462</SRS>' +
'      <SRS>EPSG:21463</SRS>' +
'      <SRS>EPSG:21473</SRS>' +
'      <SRS>EPSG:21474</SRS>' +
'      <SRS>EPSG:21475</SRS>' +
'      <SRS>EPSG:21476</SRS>' +
'      <SRS>EPSG:21477</SRS>' +
'      <SRS>EPSG:21478</SRS>' +
'      <SRS>EPSG:21479</SRS>' +
'      <SRS>EPSG:21480</SRS>' +
'      <SRS>EPSG:21481</SRS>' +
'      <SRS>EPSG:21482</SRS>' +
'      <SRS>EPSG:21483</SRS>' +
'      <SRS>EPSG:21500</SRS>' +
'      <SRS>EPSG:21780</SRS>' +
'      <SRS>EPSG:21781</SRS>' +
'      <SRS>EPSG:21817</SRS>' +
'      <SRS>EPSG:21818</SRS>' +
'      <SRS>EPSG:21891</SRS>' +
'      <SRS>EPSG:21892</SRS>' +
'      <SRS>EPSG:21893</SRS>' +
'      <SRS>EPSG:21894</SRS>' +
'      <SRS>EPSG:21896</SRS>' +
'      <SRS>EPSG:21897</SRS>' +
'      <SRS>EPSG:21898</SRS>' +
'      <SRS>EPSG:21899</SRS>' +
'      <SRS>EPSG:22032</SRS>' +
'      <SRS>EPSG:22033</SRS>' +
'      <SRS>EPSG:22091</SRS>' +
'      <SRS>EPSG:22092</SRS>' +
'      <SRS>EPSG:22171</SRS>' +
'      <SRS>EPSG:22172</SRS>' +
'      <SRS>EPSG:22173</SRS>' +
'      <SRS>EPSG:22174</SRS>' +
'      <SRS>EPSG:22175</SRS>' +
'      <SRS>EPSG:22176</SRS>' +
'      <SRS>EPSG:22177</SRS>' +
'      <SRS>EPSG:22181</SRS>' +
'      <SRS>EPSG:22182</SRS>' +
'      <SRS>EPSG:22183</SRS>' +
'      <SRS>EPSG:22184</SRS>' +
'      <SRS>EPSG:22185</SRS>' +
'      <SRS>EPSG:22186</SRS>' +
'      <SRS>EPSG:22187</SRS>' +
'      <SRS>EPSG:22191</SRS>' +
'      <SRS>EPSG:22192</SRS>' +
'      <SRS>EPSG:22193</SRS>' +
'      <SRS>EPSG:22194</SRS>' +
'      <SRS>EPSG:22195</SRS>' +
'      <SRS>EPSG:22196</SRS>' +
'      <SRS>EPSG:22197</SRS>' +
'      <SRS>EPSG:22234</SRS>' +
'      <SRS>EPSG:22235</SRS>' +
'      <SRS>EPSG:22236</SRS>' +
'      <SRS>EPSG:22275</SRS>' +
'      <SRS>EPSG:22277</SRS>' +
'      <SRS>EPSG:22279</SRS>' +
'      <SRS>EPSG:22281</SRS>' +
'      <SRS>EPSG:22283</SRS>' +
'      <SRS>EPSG:22285</SRS>' +
'      <SRS>EPSG:22287</SRS>' +
'      <SRS>EPSG:22289</SRS>' +
'      <SRS>EPSG:22291</SRS>' +
'      <SRS>EPSG:22293</SRS>' +
'      <SRS>EPSG:22300</SRS>' +
'      <SRS>EPSG:22332</SRS>' +
'      <SRS>EPSG:22391</SRS>' +
'      <SRS>EPSG:22392</SRS>' +
'      <SRS>EPSG:22521</SRS>' +
'      <SRS>EPSG:22522</SRS>' +
'      <SRS>EPSG:22523</SRS>' +
'      <SRS>EPSG:22524</SRS>' +
'      <SRS>EPSG:22525</SRS>' +
'      <SRS>EPSG:22700</SRS>' +
'      <SRS>EPSG:22770</SRS>' +
'      <SRS>EPSG:22780</SRS>' +
'      <SRS>EPSG:22832</SRS>' +
'      <SRS>EPSG:22991</SRS>' +
'      <SRS>EPSG:22992</SRS>' +
'      <SRS>EPSG:22993</SRS>' +
'      <SRS>EPSG:22994</SRS>' +
'      <SRS>EPSG:23028</SRS>' +
'      <SRS>EPSG:23029</SRS>' +
'      <SRS>EPSG:23030</SRS>' +
'      <SRS>EPSG:23031</SRS>' +
'      <SRS>EPSG:23032</SRS>' +
'      <SRS>EPSG:23033</SRS>' +
'      <SRS>EPSG:23034</SRS>' +
'      <SRS>EPSG:23035</SRS>' +
'      <SRS>EPSG:23036</SRS>' +
'      <SRS>EPSG:23037</SRS>' +
'      <SRS>EPSG:23038</SRS>' +
'      <SRS>EPSG:23090</SRS>' +
'      <SRS>EPSG:23095</SRS>' +
'      <SRS>EPSG:23239</SRS>' +
'      <SRS>EPSG:23240</SRS>' +
'      <SRS>EPSG:23433</SRS>' +
'      <SRS>EPSG:23700</SRS>' +
'      <SRS>EPSG:23846</SRS>' +
'      <SRS>EPSG:23847</SRS>' +
'      <SRS>EPSG:23848</SRS>' +
'      <SRS>EPSG:23849</SRS>' +
'      <SRS>EPSG:23850</SRS>' +
'      <SRS>EPSG:23851</SRS>' +
'      <SRS>EPSG:23852</SRS>' +
'      <SRS>EPSG:23853</SRS>' +
'      <SRS>EPSG:23866</SRS>' +
'      <SRS>EPSG:23867</SRS>' +
'      <SRS>EPSG:23868</SRS>' +
'      <SRS>EPSG:23869</SRS>' +
'      <SRS>EPSG:23870</SRS>' +
'      <SRS>EPSG:23871</SRS>' +
'      <SRS>EPSG:23872</SRS>' +
'      <SRS>EPSG:23877</SRS>' +
'      <SRS>EPSG:23878</SRS>' +
'      <SRS>EPSG:23879</SRS>' +
'      <SRS>EPSG:23880</SRS>' +
'      <SRS>EPSG:23881</SRS>' +
'      <SRS>EPSG:23882</SRS>' +
'      <SRS>EPSG:23883</SRS>' +
'      <SRS>EPSG:23884</SRS>' +
'      <SRS>EPSG:23886</SRS>' +
'      <SRS>EPSG:23887</SRS>' +
'      <SRS>EPSG:23888</SRS>' +
'      <SRS>EPSG:23889</SRS>' +
'      <SRS>EPSG:23890</SRS>' +
'      <SRS>EPSG:23891</SRS>' +
'      <SRS>EPSG:23892</SRS>' +
'      <SRS>EPSG:23893</SRS>' +
'      <SRS>EPSG:23894</SRS>' +
'      <SRS>EPSG:23946</SRS>' +
'      <SRS>EPSG:23947</SRS>' +
'      <SRS>EPSG:23948</SRS>' +
'      <SRS>EPSG:24047</SRS>' +
'      <SRS>EPSG:24048</SRS>' +
'      <SRS>EPSG:24100</SRS>' +
'      <SRS>EPSG:24200</SRS>' +
'      <SRS>EPSG:24305</SRS>' +
'      <SRS>EPSG:24306</SRS>' +
'      <SRS>EPSG:24311</SRS>' +
'      <SRS>EPSG:24312</SRS>' +
'      <SRS>EPSG:24313</SRS>' +
'      <SRS>EPSG:24342</SRS>' +
'      <SRS>EPSG:24343</SRS>' +
'      <SRS>EPSG:24344</SRS>' +
'      <SRS>EPSG:24345</SRS>' +
'      <SRS>EPSG:24346</SRS>' +
'      <SRS>EPSG:24347</SRS>' +
'      <SRS>EPSG:24370</SRS>' +
'      <SRS>EPSG:24371</SRS>' +
'      <SRS>EPSG:24372</SRS>' +
'      <SRS>EPSG:24373</SRS>' +
'      <SRS>EPSG:24374</SRS>' +
'      <SRS>EPSG:24375</SRS>' +
'      <SRS>EPSG:24376</SRS>' +
'      <SRS>EPSG:24377</SRS>' +
'      <SRS>EPSG:24378</SRS>' +
'      <SRS>EPSG:24379</SRS>' +
'      <SRS>EPSG:24380</SRS>' +
'      <SRS>EPSG:24381</SRS>' +
'      <SRS>EPSG:24382</SRS>' +
'      <SRS>EPSG:24383</SRS>' +
'      <SRS>EPSG:24500</SRS>' +
'      <SRS>EPSG:24547</SRS>' +
'      <SRS>EPSG:24548</SRS>' +
'      <SRS>EPSG:24571</SRS>' +
'      <SRS>EPSG:24600</SRS>' +
'      <SRS>EPSG:24718</SRS>' +
'      <SRS>EPSG:24719</SRS>' +
'      <SRS>EPSG:24720</SRS>' +
'      <SRS>EPSG:24817</SRS>' +
'      <SRS>EPSG:24818</SRS>' +
'      <SRS>EPSG:24819</SRS>' +
'      <SRS>EPSG:24820</SRS>' +
'      <SRS>EPSG:24821</SRS>' +
'      <SRS>EPSG:24877</SRS>' +
'      <SRS>EPSG:24878</SRS>' +
'      <SRS>EPSG:24879</SRS>' +
'      <SRS>EPSG:24880</SRS>' +
'      <SRS>EPSG:24881</SRS>' +
'      <SRS>EPSG:24882</SRS>' +
'      <SRS>EPSG:24891</SRS>' +
'      <SRS>EPSG:24892</SRS>' +
'      <SRS>EPSG:24893</SRS>' +
'      <SRS>EPSG:25000</SRS>' +
'      <SRS>EPSG:25231</SRS>' +
'      <SRS>EPSG:25391</SRS>' +
'      <SRS>EPSG:25392</SRS>' +
'      <SRS>EPSG:25393</SRS>' +
'      <SRS>EPSG:25394</SRS>' +
'      <SRS>EPSG:25395</SRS>' +
'      <SRS>EPSG:25700</SRS>' +
'      <SRS>EPSG:25828</SRS>' +
'      <SRS>EPSG:25829</SRS>' +
'      <SRS>EPSG:25830</SRS>' +
'      <SRS>EPSG:25831</SRS>' +
'      <SRS>EPSG:25832</SRS>' +
'      <SRS>EPSG:25833</SRS>' +
'      <SRS>EPSG:25834</SRS>' +
'      <SRS>EPSG:25835</SRS>' +
'      <SRS>EPSG:25836</SRS>' +
'      <SRS>EPSG:25837</SRS>' +
'      <SRS>EPSG:25838</SRS>' +
'      <SRS>EPSG:25884</SRS>' +
'      <SRS>EPSG:25932</SRS>' +
'      <SRS>EPSG:26191</SRS>' +
'      <SRS>EPSG:26192</SRS>' +
'      <SRS>EPSG:26193</SRS>' +
'      <SRS>EPSG:26194</SRS>' +
'      <SRS>EPSG:26195</SRS>' +
'      <SRS>EPSG:26237</SRS>' +
'      <SRS>EPSG:26331</SRS>' +
'      <SRS>EPSG:26332</SRS>' +
'      <SRS>EPSG:26391</SRS>' +
'      <SRS>EPSG:26392</SRS>' +
'      <SRS>EPSG:26393</SRS>' +
'      <SRS>EPSG:26432</SRS>' +
'      <SRS>EPSG:26591</SRS>' +
'      <SRS>EPSG:26592</SRS>' +
'      <SRS>EPSG:26632</SRS>' +
'      <SRS>EPSG:26692</SRS>' +
'      <SRS>EPSG:26701</SRS>' +
'      <SRS>EPSG:26702</SRS>' +
'      <SRS>EPSG:26703</SRS>' +
'      <SRS>EPSG:26704</SRS>' +
'      <SRS>EPSG:26705</SRS>' +
'      <SRS>EPSG:26706</SRS>' +
'      <SRS>EPSG:26707</SRS>' +
'      <SRS>EPSG:26708</SRS>' +
'      <SRS>EPSG:26709</SRS>' +
'      <SRS>EPSG:26710</SRS>' +
'      <SRS>EPSG:26711</SRS>' +
'      <SRS>EPSG:26712</SRS>' +
'      <SRS>EPSG:26713</SRS>' +
'      <SRS>EPSG:26714</SRS>' +
'      <SRS>EPSG:26715</SRS>' +
'      <SRS>EPSG:26716</SRS>' +
'      <SRS>EPSG:26717</SRS>' +
'      <SRS>EPSG:26718</SRS>' +
'      <SRS>EPSG:26719</SRS>' +
'      <SRS>EPSG:26720</SRS>' +
'      <SRS>EPSG:26721</SRS>' +
'      <SRS>EPSG:26722</SRS>' +
'      <SRS>EPSG:26729</SRS>' +
'      <SRS>EPSG:26730</SRS>' +
'      <SRS>EPSG:26731</SRS>' +
'      <SRS>EPSG:26732</SRS>' +
'      <SRS>EPSG:26733</SRS>' +
'      <SRS>EPSG:26734</SRS>' +
'      <SRS>EPSG:26735</SRS>' +
'      <SRS>EPSG:26736</SRS>' +
'      <SRS>EPSG:26737</SRS>' +
'      <SRS>EPSG:26738</SRS>' +
'      <SRS>EPSG:26739</SRS>' +
'      <SRS>EPSG:26740</SRS>' +
'      <SRS>EPSG:26741</SRS>' +
'      <SRS>EPSG:26742</SRS>' +
'      <SRS>EPSG:26743</SRS>' +
'      <SRS>EPSG:26744</SRS>' +
'      <SRS>EPSG:26745</SRS>' +
'      <SRS>EPSG:26746</SRS>' +
'      <SRS>EPSG:26747</SRS>' +
'      <SRS>EPSG:26748</SRS>' +
'      <SRS>EPSG:26749</SRS>' +
'      <SRS>EPSG:26750</SRS>' +
'      <SRS>EPSG:26751</SRS>' +
'      <SRS>EPSG:26752</SRS>' +
'      <SRS>EPSG:26753</SRS>' +
'      <SRS>EPSG:26754</SRS>' +
'      <SRS>EPSG:26755</SRS>' +
'      <SRS>EPSG:26756</SRS>' +
'      <SRS>EPSG:26757</SRS>' +
'      <SRS>EPSG:26758</SRS>' +
'      <SRS>EPSG:26759</SRS>' +
'      <SRS>EPSG:26760</SRS>' +
'      <SRS>EPSG:26766</SRS>' +
'      <SRS>EPSG:26767</SRS>' +
'      <SRS>EPSG:26768</SRS>' +
'      <SRS>EPSG:26769</SRS>' +
'      <SRS>EPSG:26770</SRS>' +
'      <SRS>EPSG:26771</SRS>' +
'      <SRS>EPSG:26772</SRS>' +
'      <SRS>EPSG:26773</SRS>' +
'      <SRS>EPSG:26774</SRS>' +
'      <SRS>EPSG:26775</SRS>' +
'      <SRS>EPSG:26776</SRS>' +
'      <SRS>EPSG:26777</SRS>' +
'      <SRS>EPSG:26778</SRS>' +
'      <SRS>EPSG:26779</SRS>' +
'      <SRS>EPSG:26780</SRS>' +
'      <SRS>EPSG:26781</SRS>' +
'      <SRS>EPSG:26782</SRS>' +
'      <SRS>EPSG:26783</SRS>' +
'      <SRS>EPSG:26784</SRS>' +
'      <SRS>EPSG:26785</SRS>' +
'      <SRS>EPSG:26786</SRS>' +
'      <SRS>EPSG:26787</SRS>' +
'      <SRS>EPSG:26791</SRS>' +
'      <SRS>EPSG:26792</SRS>' +
'      <SRS>EPSG:26793</SRS>' +
'      <SRS>EPSG:26794</SRS>' +
'      <SRS>EPSG:26795</SRS>' +
'      <SRS>EPSG:26796</SRS>' +
'      <SRS>EPSG:26797</SRS>' +
'      <SRS>EPSG:26798</SRS>' +
'      <SRS>EPSG:26799</SRS>' +
'      <SRS>EPSG:26801</SRS>' +
'      <SRS>EPSG:26802</SRS>' +
'      <SRS>EPSG:26803</SRS>' +
'      <SRS>EPSG:26811</SRS>' +
'      <SRS>EPSG:26812</SRS>' +
'      <SRS>EPSG:26813</SRS>' +
'      <SRS>EPSG:26901</SRS>' +
'      <SRS>EPSG:26902</SRS>' +
'      <SRS>EPSG:26903</SRS>' +
'      <SRS>EPSG:26904</SRS>' +
'      <SRS>EPSG:26905</SRS>' +
'      <SRS>EPSG:26906</SRS>' +
'      <SRS>EPSG:26907</SRS>' +
'      <SRS>EPSG:26908</SRS>' +
'      <SRS>EPSG:26909</SRS>' +
'      <SRS>EPSG:26910</SRS>' +
'      <SRS>EPSG:26911</SRS>' +
'      <SRS>EPSG:26912</SRS>' +
'      <SRS>EPSG:26913</SRS>' +
'      <SRS>EPSG:26914</SRS>' +
'      <SRS>EPSG:26915</SRS>' +
'      <SRS>EPSG:26916</SRS>' +
'      <SRS>EPSG:26917</SRS>' +
'      <SRS>EPSG:26918</SRS>' +
'      <SRS>EPSG:26919</SRS>' +
'      <SRS>EPSG:26920</SRS>' +
'      <SRS>EPSG:26921</SRS>' +
'      <SRS>EPSG:26922</SRS>' +
'      <SRS>EPSG:26923</SRS>' +
'      <SRS>EPSG:26929</SRS>' +
'      <SRS>EPSG:26930</SRS>' +
'      <SRS>EPSG:26931</SRS>' +
'      <SRS>EPSG:26932</SRS>' +
'      <SRS>EPSG:26933</SRS>' +
'      <SRS>EPSG:26934</SRS>' +
'      <SRS>EPSG:26935</SRS>' +
'      <SRS>EPSG:26936</SRS>' +
'      <SRS>EPSG:26937</SRS>' +
'      <SRS>EPSG:26938</SRS>' +
'      <SRS>EPSG:26939</SRS>' +
'      <SRS>EPSG:26940</SRS>' +
'      <SRS>EPSG:26941</SRS>' +
'      <SRS>EPSG:26942</SRS>' +
'      <SRS>EPSG:26943</SRS>' +
'      <SRS>EPSG:26944</SRS>' +
'      <SRS>EPSG:26945</SRS>' +
'      <SRS>EPSG:26946</SRS>' +
'      <SRS>EPSG:26948</SRS>' +
'      <SRS>EPSG:26949</SRS>' +
'      <SRS>EPSG:26950</SRS>' +
'      <SRS>EPSG:26951</SRS>' +
'      <SRS>EPSG:26952</SRS>' +
'      <SRS>EPSG:26953</SRS>' +
'      <SRS>EPSG:26954</SRS>' +
'      <SRS>EPSG:26955</SRS>' +
'      <SRS>EPSG:26956</SRS>' +
'      <SRS>EPSG:26957</SRS>' +
'      <SRS>EPSG:26958</SRS>' +
'      <SRS>EPSG:26959</SRS>' +
'      <SRS>EPSG:26960</SRS>' +
'      <SRS>EPSG:26961</SRS>' +
'      <SRS>EPSG:26962</SRS>' +
'      <SRS>EPSG:26963</SRS>' +
'      <SRS>EPSG:26964</SRS>' +
'      <SRS>EPSG:26965</SRS>' +
'      <SRS>EPSG:26966</SRS>' +
'      <SRS>EPSG:26967</SRS>' +
'      <SRS>EPSG:26968</SRS>' +
'      <SRS>EPSG:26969</SRS>' +
'      <SRS>EPSG:26970</SRS>' +
'      <SRS>EPSG:26971</SRS>' +
'      <SRS>EPSG:26972</SRS>' +
'      <SRS>EPSG:26973</SRS>' +
'      <SRS>EPSG:26974</SRS>' +
'      <SRS>EPSG:26975</SRS>' +
'      <SRS>EPSG:26976</SRS>' +
'      <SRS>EPSG:26977</SRS>' +
'      <SRS>EPSG:26978</SRS>' +
'      <SRS>EPSG:26979</SRS>' +
'      <SRS>EPSG:26980</SRS>' +
'      <SRS>EPSG:26981</SRS>' +
'      <SRS>EPSG:26982</SRS>' +
'      <SRS>EPSG:26983</SRS>' +
'      <SRS>EPSG:26984</SRS>' +
'      <SRS>EPSG:26985</SRS>' +
'      <SRS>EPSG:26986</SRS>' +
'      <SRS>EPSG:26987</SRS>' +
'      <SRS>EPSG:26988</SRS>' +
'      <SRS>EPSG:26989</SRS>' +
'      <SRS>EPSG:26990</SRS>' +
'      <SRS>EPSG:26991</SRS>' +
'      <SRS>EPSG:26992</SRS>' +
'      <SRS>EPSG:26993</SRS>' +
'      <SRS>EPSG:26994</SRS>' +
'      <SRS>EPSG:26995</SRS>' +
'      <SRS>EPSG:26996</SRS>' +
'      <SRS>EPSG:26997</SRS>' +
'      <SRS>EPSG:26998</SRS>' +
'      <SRS>EPSG:27037</SRS>' +
'      <SRS>EPSG:27038</SRS>' +
'      <SRS>EPSG:27039</SRS>' +
'      <SRS>EPSG:27040</SRS>' +
'      <SRS>EPSG:27120</SRS>' +
'      <SRS>EPSG:27200</SRS>' +
'      <SRS>EPSG:27205</SRS>' +
'      <SRS>EPSG:27206</SRS>' +
'      <SRS>EPSG:27207</SRS>' +
'      <SRS>EPSG:27208</SRS>' +
'      <SRS>EPSG:27209</SRS>' +
'      <SRS>EPSG:27210</SRS>' +
'      <SRS>EPSG:27211</SRS>' +
'      <SRS>EPSG:27212</SRS>' +
'      <SRS>EPSG:27213</SRS>' +
'      <SRS>EPSG:27214</SRS>' +
'      <SRS>EPSG:27215</SRS>' +
'      <SRS>EPSG:27216</SRS>' +
'      <SRS>EPSG:27217</SRS>' +
'      <SRS>EPSG:27218</SRS>' +
'      <SRS>EPSG:27219</SRS>' +
'      <SRS>EPSG:27220</SRS>' +
'      <SRS>EPSG:27221</SRS>' +
'      <SRS>EPSG:27222</SRS>' +
'      <SRS>EPSG:27223</SRS>' +
'      <SRS>EPSG:27224</SRS>' +
'      <SRS>EPSG:27225</SRS>' +
'      <SRS>EPSG:27226</SRS>' +
'      <SRS>EPSG:27227</SRS>' +
'      <SRS>EPSG:27228</SRS>' +
'      <SRS>EPSG:27229</SRS>' +
'      <SRS>EPSG:27230</SRS>' +
'      <SRS>EPSG:27231</SRS>' +
'      <SRS>EPSG:27232</SRS>' +
'      <SRS>EPSG:27258</SRS>' +
'      <SRS>EPSG:27259</SRS>' +
'      <SRS>EPSG:27260</SRS>' +
'      <SRS>EPSG:27291</SRS>' +
'      <SRS>EPSG:27292</SRS>' +
'      <SRS>EPSG:27391</SRS>' +
'      <SRS>EPSG:27392</SRS>' +
'      <SRS>EPSG:27393</SRS>' +
'      <SRS>EPSG:27394</SRS>' +
'      <SRS>EPSG:27395</SRS>' +
'      <SRS>EPSG:27396</SRS>' +
'      <SRS>EPSG:27397</SRS>' +
'      <SRS>EPSG:27398</SRS>' +
'      <SRS>EPSG:27429</SRS>' +
'      <SRS>EPSG:27492</SRS>' +
'      <SRS>EPSG:27500</SRS>' +
'      <SRS>EPSG:27561</SRS>' +
'      <SRS>EPSG:27562</SRS>' +
'      <SRS>EPSG:27563</SRS>' +
'      <SRS>EPSG:27564</SRS>' +
'      <SRS>EPSG:27571</SRS>' +
'      <SRS>EPSG:27572</SRS>' +
'      <SRS>EPSG:27573</SRS>' +
'      <SRS>EPSG:27574</SRS>' +
'      <SRS>EPSG:27581</SRS>' +
'      <SRS>EPSG:27582</SRS>' +
'      <SRS>EPSG:27583</SRS>' +
'      <SRS>EPSG:27584</SRS>' +
'      <SRS>EPSG:27591</SRS>' +
'      <SRS>EPSG:27592</SRS>' +
'      <SRS>EPSG:27593</SRS>' +
'      <SRS>EPSG:27594</SRS>' +
'      <SRS>EPSG:27700</SRS>' +
'      <SRS>EPSG:28191</SRS>' +
'      <SRS>EPSG:28192</SRS>' +
'      <SRS>EPSG:28193</SRS>' +
'      <SRS>EPSG:28232</SRS>' +
'      <SRS>EPSG:28348</SRS>' +
'      <SRS>EPSG:28349</SRS>' +
'      <SRS>EPSG:28350</SRS>' +
'      <SRS>EPSG:28351</SRS>' +
'      <SRS>EPSG:28352</SRS>' +
'      <SRS>EPSG:28353</SRS>' +
'      <SRS>EPSG:28354</SRS>' +
'      <SRS>EPSG:28355</SRS>' +
'      <SRS>EPSG:28356</SRS>' +
'      <SRS>EPSG:28357</SRS>' +
'      <SRS>EPSG:28358</SRS>' +
'      <SRS>EPSG:28402</SRS>' +
'      <SRS>EPSG:28403</SRS>' +
'      <SRS>EPSG:28404</SRS>' +
'      <SRS>EPSG:28405</SRS>' +
'      <SRS>EPSG:28406</SRS>' +
'      <SRS>EPSG:28407</SRS>' +
'      <SRS>EPSG:28408</SRS>' +
'      <SRS>EPSG:28409</SRS>' +
'      <SRS>EPSG:28410</SRS>' +
'      <SRS>EPSG:28411</SRS>' +
'      <SRS>EPSG:28412</SRS>' +
'      <SRS>EPSG:28413</SRS>' +
'      <SRS>EPSG:28414</SRS>' +
'      <SRS>EPSG:28415</SRS>' +
'      <SRS>EPSG:28416</SRS>' +
'      <SRS>EPSG:28417</SRS>' +
'      <SRS>EPSG:28418</SRS>' +
'      <SRS>EPSG:28419</SRS>' +
'      <SRS>EPSG:28420</SRS>' +
'      <SRS>EPSG:28421</SRS>' +
'      <SRS>EPSG:28422</SRS>' +
'      <SRS>EPSG:28423</SRS>' +
'      <SRS>EPSG:28424</SRS>' +
'      <SRS>EPSG:28425</SRS>' +
'      <SRS>EPSG:28426</SRS>' +
'      <SRS>EPSG:28427</SRS>' +
'      <SRS>EPSG:28428</SRS>' +
'      <SRS>EPSG:28429</SRS>' +
'      <SRS>EPSG:28430</SRS>' +
'      <SRS>EPSG:28431</SRS>' +
'      <SRS>EPSG:28432</SRS>' +
'      <SRS>EPSG:28462</SRS>' +
'      <SRS>EPSG:28463</SRS>' +
'      <SRS>EPSG:28464</SRS>' +
'      <SRS>EPSG:28465</SRS>' +
'      <SRS>EPSG:28466</SRS>' +
'      <SRS>EPSG:28467</SRS>' +
'      <SRS>EPSG:28468</SRS>' +
'      <SRS>EPSG:28469</SRS>' +
'      <SRS>EPSG:28470</SRS>' +
'      <SRS>EPSG:28471</SRS>' +
'      <SRS>EPSG:28472</SRS>' +
'      <SRS>EPSG:28473</SRS>' +
'      <SRS>EPSG:28474</SRS>' +
'      <SRS>EPSG:28475</SRS>' +
'      <SRS>EPSG:28476</SRS>' +
'      <SRS>EPSG:28477</SRS>' +
'      <SRS>EPSG:28478</SRS>' +
'      <SRS>EPSG:28479</SRS>' +
'      <SRS>EPSG:28480</SRS>' +
'      <SRS>EPSG:28481</SRS>' +
'      <SRS>EPSG:28482</SRS>' +
'      <SRS>EPSG:28483</SRS>' +
'      <SRS>EPSG:28484</SRS>' +
'      <SRS>EPSG:28485</SRS>' +
'      <SRS>EPSG:28486</SRS>' +
'      <SRS>EPSG:28487</SRS>' +
'      <SRS>EPSG:28488</SRS>' +
'      <SRS>EPSG:28489</SRS>' +
'      <SRS>EPSG:28490</SRS>' +
'      <SRS>EPSG:28491</SRS>' +
'      <SRS>EPSG:28492</SRS>' +
'      <SRS>EPSG:28600</SRS>' +
'      <SRS>EPSG:28991</SRS>' +
'      <SRS>EPSG:28992</SRS>' +
'      <SRS>EPSG:29100</SRS>' +
'      <SRS>EPSG:29101</SRS>' +
'      <SRS>EPSG:29118</SRS>' +
'      <SRS>EPSG:29119</SRS>' +
'      <SRS>EPSG:29120</SRS>' +
'      <SRS>EPSG:29121</SRS>' +
'      <SRS>EPSG:29122</SRS>' +
'      <SRS>EPSG:29168</SRS>' +
'      <SRS>EPSG:29169</SRS>' +
'      <SRS>EPSG:29170</SRS>' +
'      <SRS>EPSG:29171</SRS>' +
'      <SRS>EPSG:29172</SRS>' +
'      <SRS>EPSG:29177</SRS>' +
'      <SRS>EPSG:29178</SRS>' +
'      <SRS>EPSG:29179</SRS>' +
'      <SRS>EPSG:29180</SRS>' +
'      <SRS>EPSG:29181</SRS>' +
'      <SRS>EPSG:29182</SRS>' +
'      <SRS>EPSG:29183</SRS>' +
'      <SRS>EPSG:29184</SRS>' +
'      <SRS>EPSG:29185</SRS>' +
'      <SRS>EPSG:29187</SRS>' +
'      <SRS>EPSG:29188</SRS>' +
'      <SRS>EPSG:29189</SRS>' +
'      <SRS>EPSG:29190</SRS>' +
'      <SRS>EPSG:29191</SRS>' +
'      <SRS>EPSG:29192</SRS>' +
'      <SRS>EPSG:29193</SRS>' +
'      <SRS>EPSG:29194</SRS>' +
'      <SRS>EPSG:29195</SRS>' +
'      <SRS>EPSG:29220</SRS>' +
'      <SRS>EPSG:29221</SRS>' +
'      <SRS>EPSG:29333</SRS>' +
'      <SRS>EPSG:29371</SRS>' +
'      <SRS>EPSG:29373</SRS>' +
'      <SRS>EPSG:29375</SRS>' +
'      <SRS>EPSG:29377</SRS>' +
'      <SRS>EPSG:29379</SRS>' +
'      <SRS>EPSG:29381</SRS>' +
'      <SRS>EPSG:29383</SRS>' +
'      <SRS>EPSG:29385</SRS>' +
'      <SRS>EPSG:29635</SRS>' +
'      <SRS>EPSG:29636</SRS>' +
'      <SRS>EPSG:29700</SRS>' +
'      <SRS>EPSG:29701</SRS>' +
'      <SRS>EPSG:29702</SRS>' +
'      <SRS>EPSG:29738</SRS>' +
'      <SRS>EPSG:29739</SRS>' +
'      <SRS>EPSG:29849</SRS>' +
'      <SRS>EPSG:29850</SRS>' +
'      <SRS>EPSG:29871</SRS>' +
'      <SRS>EPSG:29872</SRS>' +
'      <SRS>EPSG:29873</SRS>' +
'      <SRS>EPSG:29900</SRS>' +
'      <SRS>EPSG:29901</SRS>' +
'      <SRS>EPSG:29902</SRS>' +
'      <SRS>EPSG:29903</SRS>' +
'      <SRS>EPSG:30161</SRS>' +
'      <SRS>EPSG:30162</SRS>' +
'      <SRS>EPSG:30163</SRS>' +
'      <SRS>EPSG:30164</SRS>' +
'      <SRS>EPSG:30165</SRS>' +
'      <SRS>EPSG:30166</SRS>' +
'      <SRS>EPSG:30167</SRS>' +
'      <SRS>EPSG:30168</SRS>' +
'      <SRS>EPSG:30169</SRS>' +
'      <SRS>EPSG:30170</SRS>' +
'      <SRS>EPSG:30171</SRS>' +
'      <SRS>EPSG:30172</SRS>' +
'      <SRS>EPSG:30173</SRS>' +
'      <SRS>EPSG:30174</SRS>' +
'      <SRS>EPSG:30175</SRS>' +
'      <SRS>EPSG:30176</SRS>' +
'      <SRS>EPSG:30177</SRS>' +
'      <SRS>EPSG:30178</SRS>' +
'      <SRS>EPSG:30179</SRS>' +
'      <SRS>EPSG:30200</SRS>' +
'      <SRS>EPSG:30339</SRS>' +
'      <SRS>EPSG:30340</SRS>' +
'      <SRS>EPSG:30491</SRS>' +
'      <SRS>EPSG:30492</SRS>' +
'      <SRS>EPSG:30493</SRS>' +
'      <SRS>EPSG:30494</SRS>' +
'      <SRS>EPSG:30729</SRS>' +
'      <SRS>EPSG:30730</SRS>' +
'      <SRS>EPSG:30731</SRS>' +
'      <SRS>EPSG:30732</SRS>' +
'      <SRS>EPSG:30791</SRS>' +
'      <SRS>EPSG:30792</SRS>' +
'      <SRS>EPSG:30800</SRS>' +
'      <SRS>EPSG:31028</SRS>' +
'      <SRS>EPSG:31121</SRS>' +
'      <SRS>EPSG:31154</SRS>' +
'      <SRS>EPSG:31170</SRS>' +
'      <SRS>EPSG:31171</SRS>' +
'      <SRS>EPSG:31251</SRS>' +
'      <SRS>EPSG:31252</SRS>' +
'      <SRS>EPSG:31253</SRS>' +
'      <SRS>EPSG:31254</SRS>' +
'      <SRS>EPSG:31255</SRS>' +
'      <SRS>EPSG:31256</SRS>' +
'      <SRS>EPSG:31257</SRS>' +
'      <SRS>EPSG:31258</SRS>' +
'      <SRS>EPSG:31259</SRS>' +
'      <SRS>EPSG:31265</SRS>' +
'      <SRS>EPSG:31266</SRS>' +
'      <SRS>EPSG:31267</SRS>' +
'      <SRS>EPSG:31268</SRS>' +
'      <SRS>EPSG:31275</SRS>' +
'      <SRS>EPSG:31276</SRS>' +
'      <SRS>EPSG:31277</SRS>' +
'      <SRS>EPSG:31278</SRS>' +
'      <SRS>EPSG:31279</SRS>' +
'      <SRS>EPSG:31281</SRS>' +
'      <SRS>EPSG:31282</SRS>' +
'      <SRS>EPSG:31283</SRS>' +
'      <SRS>EPSG:31284</SRS>' +
'      <SRS>EPSG:31285</SRS>' +
'      <SRS>EPSG:31286</SRS>' +
'      <SRS>EPSG:31287</SRS>' +
'      <SRS>EPSG:31288</SRS>' +
'      <SRS>EPSG:31289</SRS>' +
'      <SRS>EPSG:31290</SRS>' +
'      <SRS>EPSG:31291</SRS>' +
'      <SRS>EPSG:31292</SRS>' +
'      <SRS>EPSG:31293</SRS>' +
'      <SRS>EPSG:31294</SRS>' +
'      <SRS>EPSG:31295</SRS>' +
'      <SRS>EPSG:31296</SRS>' +
'      <SRS>EPSG:31297</SRS>' +
'      <SRS>EPSG:31300</SRS>' +
'      <SRS>EPSG:31370</SRS>' +
'      <SRS>EPSG:31461</SRS>' +
'      <SRS>EPSG:31462</SRS>' +
'      <SRS>EPSG:31463</SRS>' +
'      <SRS>EPSG:31464</SRS>' +
'      <SRS>EPSG:31465</SRS>' +
'      <SRS>EPSG:31466</SRS>' +
'      <SRS>EPSG:31467</SRS>' +
'      <SRS>EPSG:31468</SRS>' +
'      <SRS>EPSG:31469</SRS>' +
'      <SRS>EPSG:31528</SRS>' +
'      <SRS>EPSG:31529</SRS>' +
'      <SRS>EPSG:31600</SRS>' +
'      <SRS>EPSG:31700</SRS>' +
'      <SRS>EPSG:31838</SRS>' +
'      <SRS>EPSG:31839</SRS>' +
'      <SRS>EPSG:31900</SRS>' +
'      <SRS>EPSG:31901</SRS>' +
'      <SRS>EPSG:31965</SRS>' +
'      <SRS>EPSG:31966</SRS>' +
'      <SRS>EPSG:31967</SRS>' +
'      <SRS>EPSG:31968</SRS>' +
'      <SRS>EPSG:31969</SRS>' +
'      <SRS>EPSG:31970</SRS>' +
'      <SRS>EPSG:31971</SRS>' +
'      <SRS>EPSG:31972</SRS>' +
'      <SRS>EPSG:31973</SRS>' +
'      <SRS>EPSG:31974</SRS>' +
'      <SRS>EPSG:31975</SRS>' +
'      <SRS>EPSG:31976</SRS>' +
'      <SRS>EPSG:31977</SRS>' +
'      <SRS>EPSG:31978</SRS>' +
'      <SRS>EPSG:31979</SRS>' +
'      <SRS>EPSG:31980</SRS>' +
'      <SRS>EPSG:31981</SRS>' +
'      <SRS>EPSG:31982</SRS>' +
'      <SRS>EPSG:31983</SRS>' +
'      <SRS>EPSG:31984</SRS>' +
'      <SRS>EPSG:31985</SRS>' +
'      <SRS>EPSG:31986</SRS>' +
'      <SRS>EPSG:31987</SRS>' +
'      <SRS>EPSG:31988</SRS>' +
'      <SRS>EPSG:31989</SRS>' +
'      <SRS>EPSG:31990</SRS>' +
'      <SRS>EPSG:31991</SRS>' +
'      <SRS>EPSG:31992</SRS>' +
'      <SRS>EPSG:31993</SRS>' +
'      <SRS>EPSG:31994</SRS>' +
'      <SRS>EPSG:31995</SRS>' +
'      <SRS>EPSG:31996</SRS>' +
'      <SRS>EPSG:31997</SRS>' +
'      <SRS>EPSG:31998</SRS>' +
'      <SRS>EPSG:31999</SRS>' +
'      <SRS>EPSG:32000</SRS>' +
'      <SRS>EPSG:32001</SRS>' +
'      <SRS>EPSG:32002</SRS>' +
'      <SRS>EPSG:32003</SRS>' +
'      <SRS>EPSG:32005</SRS>' +
'      <SRS>EPSG:32006</SRS>' +
'      <SRS>EPSG:32007</SRS>' +
'      <SRS>EPSG:32008</SRS>' +
'      <SRS>EPSG:32009</SRS>' +
'      <SRS>EPSG:32010</SRS>' +
'      <SRS>EPSG:32011</SRS>' +
'      <SRS>EPSG:32012</SRS>' +
'      <SRS>EPSG:32013</SRS>' +
'      <SRS>EPSG:32014</SRS>' +
'      <SRS>EPSG:32015</SRS>' +
'      <SRS>EPSG:32016</SRS>' +
'      <SRS>EPSG:32017</SRS>' +
'      <SRS>EPSG:32018</SRS>' +
'      <SRS>EPSG:32019</SRS>' +
'      <SRS>EPSG:32020</SRS>' +
'      <SRS>EPSG:32021</SRS>' +
'      <SRS>EPSG:32022</SRS>' +
'      <SRS>EPSG:32023</SRS>' +
'      <SRS>EPSG:32024</SRS>' +
'      <SRS>EPSG:32025</SRS>' +
'      <SRS>EPSG:32026</SRS>' +
'      <SRS>EPSG:32027</SRS>' +
'      <SRS>EPSG:32028</SRS>' +
'      <SRS>EPSG:32029</SRS>' +
'      <SRS>EPSG:32030</SRS>' +
'      <SRS>EPSG:32031</SRS>' +
'      <SRS>EPSG:32033</SRS>' +
'      <SRS>EPSG:32034</SRS>' +
'      <SRS>EPSG:32035</SRS>' +
'      <SRS>EPSG:32036</SRS>' +
'      <SRS>EPSG:32037</SRS>' +
'      <SRS>EPSG:32038</SRS>' +
'      <SRS>EPSG:32039</SRS>' +
'      <SRS>EPSG:32040</SRS>' +
'      <SRS>EPSG:32041</SRS>' +
'      <SRS>EPSG:32042</SRS>' +
'      <SRS>EPSG:32043</SRS>' +
'      <SRS>EPSG:32044</SRS>' +
'      <SRS>EPSG:32045</SRS>' +
'      <SRS>EPSG:32046</SRS>' +
'      <SRS>EPSG:32047</SRS>' +
'      <SRS>EPSG:32048</SRS>' +
'      <SRS>EPSG:32049</SRS>' +
'      <SRS>EPSG:32050</SRS>' +
'      <SRS>EPSG:32051</SRS>' +
'      <SRS>EPSG:32052</SRS>' +
'      <SRS>EPSG:32053</SRS>' +
'      <SRS>EPSG:32054</SRS>' +
'      <SRS>EPSG:32055</SRS>' +
'      <SRS>EPSG:32056</SRS>' +
'      <SRS>EPSG:32057</SRS>' +
'      <SRS>EPSG:32058</SRS>' +
'      <SRS>EPSG:32061</SRS>' +
'      <SRS>EPSG:32062</SRS>' +
'      <SRS>EPSG:32064</SRS>' +
'      <SRS>EPSG:32065</SRS>' +
'      <SRS>EPSG:32066</SRS>' +
'      <SRS>EPSG:32067</SRS>' +
'      <SRS>EPSG:32074</SRS>' +
'      <SRS>EPSG:32075</SRS>' +
'      <SRS>EPSG:32076</SRS>' +
'      <SRS>EPSG:32077</SRS>' +
'      <SRS>EPSG:32081</SRS>' +
'      <SRS>EPSG:32082</SRS>' +
'      <SRS>EPSG:32083</SRS>' +
'      <SRS>EPSG:32084</SRS>' +
'      <SRS>EPSG:32085</SRS>' +
'      <SRS>EPSG:32086</SRS>' +
'      <SRS>EPSG:32098</SRS>' +
'      <SRS>EPSG:32099</SRS>' +
'      <SRS>EPSG:32100</SRS>' +
'      <SRS>EPSG:32104</SRS>' +
'      <SRS>EPSG:32107</SRS>' +
'      <SRS>EPSG:32108</SRS>' +
'      <SRS>EPSG:32109</SRS>' +
'      <SRS>EPSG:32110</SRS>' +
'      <SRS>EPSG:32111</SRS>' +
'      <SRS>EPSG:32112</SRS>' +
'      <SRS>EPSG:32113</SRS>' +
'      <SRS>EPSG:32114</SRS>' +
'      <SRS>EPSG:32115</SRS>' +
'      <SRS>EPSG:32116</SRS>' +
'      <SRS>EPSG:32117</SRS>' +
'      <SRS>EPSG:32118</SRS>' +
'      <SRS>EPSG:32119</SRS>' +
'      <SRS>EPSG:32120</SRS>' +
'      <SRS>EPSG:32121</SRS>' +
'      <SRS>EPSG:32122</SRS>' +
'      <SRS>EPSG:32123</SRS>' +
'      <SRS>EPSG:32124</SRS>' +
'      <SRS>EPSG:32125</SRS>' +
'      <SRS>EPSG:32126</SRS>' +
'      <SRS>EPSG:32127</SRS>' +
'      <SRS>EPSG:32128</SRS>' +
'      <SRS>EPSG:32129</SRS>' +
'      <SRS>EPSG:32130</SRS>' +
'      <SRS>EPSG:32133</SRS>' +
'      <SRS>EPSG:32134</SRS>' +
'      <SRS>EPSG:32135</SRS>' +
'      <SRS>EPSG:32136</SRS>' +
'      <SRS>EPSG:32137</SRS>' +
'      <SRS>EPSG:32138</SRS>' +
'      <SRS>EPSG:32139</SRS>' +
'      <SRS>EPSG:32140</SRS>' +
'      <SRS>EPSG:32141</SRS>' +
'      <SRS>EPSG:32142</SRS>' +
'      <SRS>EPSG:32143</SRS>' +
'      <SRS>EPSG:32144</SRS>' +
'      <SRS>EPSG:32145</SRS>' +
'      <SRS>EPSG:32146</SRS>' +
'      <SRS>EPSG:32147</SRS>' +
'      <SRS>EPSG:32148</SRS>' +
'      <SRS>EPSG:32149</SRS>' +
'      <SRS>EPSG:32150</SRS>' +
'      <SRS>EPSG:32151</SRS>' +
'      <SRS>EPSG:32152</SRS>' +
'      <SRS>EPSG:32153</SRS>' +
'      <SRS>EPSG:32154</SRS>' +
'      <SRS>EPSG:32155</SRS>' +
'      <SRS>EPSG:32156</SRS>' +
'      <SRS>EPSG:32157</SRS>' +
'      <SRS>EPSG:32158</SRS>' +
'      <SRS>EPSG:32161</SRS>' +
'      <SRS>EPSG:32164</SRS>' +
'      <SRS>EPSG:32165</SRS>' +
'      <SRS>EPSG:32166</SRS>' +
'      <SRS>EPSG:32167</SRS>' +
'      <SRS>EPSG:32180</SRS>' +
'      <SRS>EPSG:32181</SRS>' +
'      <SRS>EPSG:32182</SRS>' +
'      <SRS>EPSG:32183</SRS>' +
'      <SRS>EPSG:32184</SRS>' +
'      <SRS>EPSG:32185</SRS>' +
'      <SRS>EPSG:32186</SRS>' +
'      <SRS>EPSG:32187</SRS>' +
'      <SRS>EPSG:32188</SRS>' +
'      <SRS>EPSG:32189</SRS>' +
'      <SRS>EPSG:32190</SRS>' +
'      <SRS>EPSG:32191</SRS>' +
'      <SRS>EPSG:32192</SRS>' +
'      <SRS>EPSG:32193</SRS>' +
'      <SRS>EPSG:32194</SRS>' +
'      <SRS>EPSG:32195</SRS>' +
'      <SRS>EPSG:32196</SRS>' +
'      <SRS>EPSG:32197</SRS>' +
'      <SRS>EPSG:32198</SRS>' +
'      <SRS>EPSG:32199</SRS>' +
'      <SRS>EPSG:32201</SRS>' +
'      <SRS>EPSG:32202</SRS>' +
'      <SRS>EPSG:32203</SRS>' +
'      <SRS>EPSG:32204</SRS>' +
'      <SRS>EPSG:32205</SRS>' +
'      <SRS>EPSG:32206</SRS>' +
'      <SRS>EPSG:32207</SRS>' +
'      <SRS>EPSG:32208</SRS>' +
'      <SRS>EPSG:32209</SRS>' +
'      <SRS>EPSG:32210</SRS>' +
'      <SRS>EPSG:32211</SRS>' +
'      <SRS>EPSG:32212</SRS>' +
'      <SRS>EPSG:32213</SRS>' +
'      <SRS>EPSG:32214</SRS>' +
'      <SRS>EPSG:32215</SRS>' +
'      <SRS>EPSG:32216</SRS>' +
'      <SRS>EPSG:32217</SRS>' +
'      <SRS>EPSG:32218</SRS>' +
'      <SRS>EPSG:32219</SRS>' +
'      <SRS>EPSG:32220</SRS>' +
'      <SRS>EPSG:32221</SRS>' +
'      <SRS>EPSG:32222</SRS>' +
'      <SRS>EPSG:32223</SRS>' +
'      <SRS>EPSG:32224</SRS>' +
'      <SRS>EPSG:32225</SRS>' +
'      <SRS>EPSG:32226</SRS>' +
'      <SRS>EPSG:32227</SRS>' +
'      <SRS>EPSG:32228</SRS>' +
'      <SRS>EPSG:32229</SRS>' +
'      <SRS>EPSG:32230</SRS>' +
'      <SRS>EPSG:32231</SRS>' +
'      <SRS>EPSG:32232</SRS>' +
'      <SRS>EPSG:32233</SRS>' +
'      <SRS>EPSG:32234</SRS>' +
'      <SRS>EPSG:32235</SRS>' +
'      <SRS>EPSG:32236</SRS>' +
'      <SRS>EPSG:32237</SRS>' +
'      <SRS>EPSG:32238</SRS>' +
'      <SRS>EPSG:32239</SRS>' +
'      <SRS>EPSG:32240</SRS>' +
'      <SRS>EPSG:32241</SRS>' +
'      <SRS>EPSG:32242</SRS>' +
'      <SRS>EPSG:32243</SRS>' +
'      <SRS>EPSG:32244</SRS>' +
'      <SRS>EPSG:32245</SRS>' +
'      <SRS>EPSG:32246</SRS>' +
'      <SRS>EPSG:32247</SRS>' +
'      <SRS>EPSG:32248</SRS>' +
'      <SRS>EPSG:32249</SRS>' +
'      <SRS>EPSG:32250</SRS>' +
'      <SRS>EPSG:32251</SRS>' +
'      <SRS>EPSG:32252</SRS>' +
'      <SRS>EPSG:32253</SRS>' +
'      <SRS>EPSG:32254</SRS>' +
'      <SRS>EPSG:32255</SRS>' +
'      <SRS>EPSG:32256</SRS>' +
'      <SRS>EPSG:32257</SRS>' +
'      <SRS>EPSG:32258</SRS>' +
'      <SRS>EPSG:32259</SRS>' +
'      <SRS>EPSG:32260</SRS>' +
'      <SRS>EPSG:32301</SRS>' +
'      <SRS>EPSG:32302</SRS>' +
'      <SRS>EPSG:32303</SRS>' +
'      <SRS>EPSG:32304</SRS>' +
'      <SRS>EPSG:32305</SRS>' +
'      <SRS>EPSG:32306</SRS>' +
'      <SRS>EPSG:32307</SRS>' +
'      <SRS>EPSG:32308</SRS>' +
'      <SRS>EPSG:32309</SRS>' +
'      <SRS>EPSG:32310</SRS>' +
'      <SRS>EPSG:32311</SRS>' +
'      <SRS>EPSG:32312</SRS>' +
'      <SRS>EPSG:32313</SRS>' +
'      <SRS>EPSG:32314</SRS>' +
'      <SRS>EPSG:32315</SRS>' +
'      <SRS>EPSG:32316</SRS>' +
'      <SRS>EPSG:32317</SRS>' +
'      <SRS>EPSG:32318</SRS>' +
'      <SRS>EPSG:32319</SRS>' +
'      <SRS>EPSG:32320</SRS>' +
'      <SRS>EPSG:32321</SRS>' +
'      <SRS>EPSG:32322</SRS>' +
'      <SRS>EPSG:32323</SRS>' +
'      <SRS>EPSG:32324</SRS>' +
'      <SRS>EPSG:32325</SRS>' +
'      <SRS>EPSG:32326</SRS>' +
'      <SRS>EPSG:32327</SRS>' +
'      <SRS>EPSG:32328</SRS>' +
'      <SRS>EPSG:32329</SRS>' +
'      <SRS>EPSG:32330</SRS>' +
'      <SRS>EPSG:32331</SRS>' +
'      <SRS>EPSG:32332</SRS>' +
'      <SRS>EPSG:32333</SRS>' +
'      <SRS>EPSG:32334</SRS>' +
'      <SRS>EPSG:32335</SRS>' +
'      <SRS>EPSG:32336</SRS>' +
'      <SRS>EPSG:32337</SRS>' +
'      <SRS>EPSG:32338</SRS>' +
'      <SRS>EPSG:32339</SRS>' +
'      <SRS>EPSG:32340</SRS>' +
'      <SRS>EPSG:32341</SRS>' +
'      <SRS>EPSG:32342</SRS>' +
'      <SRS>EPSG:32343</SRS>' +
'      <SRS>EPSG:32344</SRS>' +
'      <SRS>EPSG:32345</SRS>' +
'      <SRS>EPSG:32346</SRS>' +
'      <SRS>EPSG:32347</SRS>' +
'      <SRS>EPSG:32348</SRS>' +
'      <SRS>EPSG:32349</SRS>' +
'      <SRS>EPSG:32350</SRS>' +
'      <SRS>EPSG:32351</SRS>' +
'      <SRS>EPSG:32352</SRS>' +
'      <SRS>EPSG:32353</SRS>' +
'      <SRS>EPSG:32354</SRS>' +
'      <SRS>EPSG:32355</SRS>' +
'      <SRS>EPSG:32356</SRS>' +
'      <SRS>EPSG:32357</SRS>' +
'      <SRS>EPSG:32358</SRS>' +
'      <SRS>EPSG:32359</SRS>' +
'      <SRS>EPSG:32360</SRS>' +
'      <SRS>EPSG:32401</SRS>' +
'      <SRS>EPSG:32402</SRS>' +
'      <SRS>EPSG:32403</SRS>' +
'      <SRS>EPSG:32404</SRS>' +
'      <SRS>EPSG:32405</SRS>' +
'      <SRS>EPSG:32406</SRS>' +
'      <SRS>EPSG:32407</SRS>' +
'      <SRS>EPSG:32408</SRS>' +
'      <SRS>EPSG:32409</SRS>' +
'      <SRS>EPSG:32410</SRS>' +
'      <SRS>EPSG:32411</SRS>' +
'      <SRS>EPSG:32412</SRS>' +
'      <SRS>EPSG:32413</SRS>' +
'      <SRS>EPSG:32414</SRS>' +
'      <SRS>EPSG:32415</SRS>' +
'      <SRS>EPSG:32416</SRS>' +
'      <SRS>EPSG:32417</SRS>' +
'      <SRS>EPSG:32418</SRS>' +
'      <SRS>EPSG:32419</SRS>' +
'      <SRS>EPSG:32420</SRS>' +
'      <SRS>EPSG:32421</SRS>' +
'      <SRS>EPSG:32422</SRS>' +
'      <SRS>EPSG:32423</SRS>' +
'      <SRS>EPSG:32424</SRS>' +
'      <SRS>EPSG:32425</SRS>' +
'      <SRS>EPSG:32426</SRS>' +
'      <SRS>EPSG:32427</SRS>' +
'      <SRS>EPSG:32428</SRS>' +
'      <SRS>EPSG:32429</SRS>' +
'      <SRS>EPSG:32430</SRS>' +
'      <SRS>EPSG:32431</SRS>' +
'      <SRS>EPSG:32432</SRS>' +
'      <SRS>EPSG:32433</SRS>' +
'      <SRS>EPSG:32434</SRS>' +
'      <SRS>EPSG:32435</SRS>' +
'      <SRS>EPSG:32436</SRS>' +
'      <SRS>EPSG:32437</SRS>' +
'      <SRS>EPSG:32438</SRS>' +
'      <SRS>EPSG:32439</SRS>' +
'      <SRS>EPSG:32440</SRS>' +
'      <SRS>EPSG:32441</SRS>' +
'      <SRS>EPSG:32442</SRS>' +
'      <SRS>EPSG:32443</SRS>' +
'      <SRS>EPSG:32444</SRS>' +
'      <SRS>EPSG:32445</SRS>' +
'      <SRS>EPSG:32446</SRS>' +
'      <SRS>EPSG:32447</SRS>' +
'      <SRS>EPSG:32448</SRS>' +
'      <SRS>EPSG:32449</SRS>' +
'      <SRS>EPSG:32450</SRS>' +
'      <SRS>EPSG:32451</SRS>' +
'      <SRS>EPSG:32452</SRS>' +
'      <SRS>EPSG:32453</SRS>' +
'      <SRS>EPSG:32454</SRS>' +
'      <SRS>EPSG:32455</SRS>' +
'      <SRS>EPSG:32456</SRS>' +
'      <SRS>EPSG:32457</SRS>' +
'      <SRS>EPSG:32458</SRS>' +
'      <SRS>EPSG:32459</SRS>' +
'      <SRS>EPSG:32460</SRS>' +
'      <SRS>EPSG:32501</SRS>' +
'      <SRS>EPSG:32502</SRS>' +
'      <SRS>EPSG:32503</SRS>' +
'      <SRS>EPSG:32504</SRS>' +
'      <SRS>EPSG:32505</SRS>' +
'      <SRS>EPSG:32506</SRS>' +
'      <SRS>EPSG:32507</SRS>' +
'      <SRS>EPSG:32508</SRS>' +
'      <SRS>EPSG:32509</SRS>' +
'      <SRS>EPSG:32510</SRS>' +
'      <SRS>EPSG:32511</SRS>' +
'      <SRS>EPSG:32512</SRS>' +
'      <SRS>EPSG:32513</SRS>' +
'      <SRS>EPSG:32514</SRS>' +
'      <SRS>EPSG:32515</SRS>' +
'      <SRS>EPSG:32516</SRS>' +
'      <SRS>EPSG:32517</SRS>' +
'      <SRS>EPSG:32518</SRS>' +
'      <SRS>EPSG:32519</SRS>' +
'      <SRS>EPSG:32520</SRS>' +
'      <SRS>EPSG:32521</SRS>' +
'      <SRS>EPSG:32522</SRS>' +
'      <SRS>EPSG:32523</SRS>' +
'      <SRS>EPSG:32524</SRS>' +
'      <SRS>EPSG:32525</SRS>' +
'      <SRS>EPSG:32526</SRS>' +
'      <SRS>EPSG:32527</SRS>' +
'      <SRS>EPSG:32528</SRS>' +
'      <SRS>EPSG:32529</SRS>' +
'      <SRS>EPSG:32530</SRS>' +
'      <SRS>EPSG:32531</SRS>' +
'      <SRS>EPSG:32532</SRS>' +
'      <SRS>EPSG:32533</SRS>' +
'      <SRS>EPSG:32534</SRS>' +
'      <SRS>EPSG:32535</SRS>' +
'      <SRS>EPSG:32536</SRS>' +
'      <SRS>EPSG:32537</SRS>' +
'      <SRS>EPSG:32538</SRS>' +
'      <SRS>EPSG:32539</SRS>' +
'      <SRS>EPSG:32540</SRS>' +
'      <SRS>EPSG:32541</SRS>' +
'      <SRS>EPSG:32542</SRS>' +
'      <SRS>EPSG:32543</SRS>' +
'      <SRS>EPSG:32544</SRS>' +
'      <SRS>EPSG:32545</SRS>' +
'      <SRS>EPSG:32546</SRS>' +
'      <SRS>EPSG:32547</SRS>' +
'      <SRS>EPSG:32548</SRS>' +
'      <SRS>EPSG:32549</SRS>' +
'      <SRS>EPSG:32550</SRS>' +
'      <SRS>EPSG:32551</SRS>' +
'      <SRS>EPSG:32552</SRS>' +
'      <SRS>EPSG:32553</SRS>' +
'      <SRS>EPSG:32554</SRS>' +
'      <SRS>EPSG:32555</SRS>' +
'      <SRS>EPSG:32556</SRS>' +
'      <SRS>EPSG:32557</SRS>' +
'      <SRS>EPSG:32558</SRS>' +
'      <SRS>EPSG:32559</SRS>' +
'      <SRS>EPSG:32560</SRS>' +
'      <SRS>EPSG:32600</SRS>' +
'      <SRS>EPSG:32601</SRS>' +
'      <SRS>EPSG:32602</SRS>' +
'      <SRS>EPSG:32603</SRS>' +
'      <SRS>EPSG:32604</SRS>' +
'      <SRS>EPSG:32605</SRS>' +
'      <SRS>EPSG:32606</SRS>' +
'      <SRS>EPSG:32607</SRS>' +
'      <SRS>EPSG:32608</SRS>' +
'      <SRS>EPSG:32609</SRS>' +
'      <SRS>EPSG:32610</SRS>' +
'      <SRS>EPSG:32611</SRS>' +
'      <SRS>EPSG:32612</SRS>' +
'      <SRS>EPSG:32613</SRS>' +
'      <SRS>EPSG:32614</SRS>' +
'      <SRS>EPSG:32615</SRS>' +
'      <SRS>EPSG:32616</SRS>' +
'      <SRS>EPSG:32617</SRS>' +
'      <SRS>EPSG:32618</SRS>' +
'      <SRS>EPSG:32619</SRS>' +
'      <SRS>EPSG:32620</SRS>' +
'      <SRS>EPSG:32621</SRS>' +
'      <SRS>EPSG:32622</SRS>' +
'      <SRS>EPSG:32623</SRS>' +
'      <SRS>EPSG:32624</SRS>' +
'      <SRS>EPSG:32625</SRS>' +
'      <SRS>EPSG:32626</SRS>' +
'      <SRS>EPSG:32627</SRS>' +
'      <SRS>EPSG:32628</SRS>' +
'      <SRS>EPSG:32629</SRS>' +
'      <SRS>EPSG:32630</SRS>' +
'      <SRS>EPSG:32631</SRS>' +
'      <SRS>EPSG:32632</SRS>' +
'      <SRS>EPSG:32633</SRS>' +
'      <SRS>EPSG:32634</SRS>' +
'      <SRS>EPSG:32635</SRS>' +
'      <SRS>EPSG:32636</SRS>' +
'      <SRS>EPSG:32637</SRS>' +
'      <SRS>EPSG:32638</SRS>' +
'      <SRS>EPSG:32639</SRS>' +
'      <SRS>EPSG:32640</SRS>' +
'      <SRS>EPSG:32641</SRS>' +
'      <SRS>EPSG:32642</SRS>' +
'      <SRS>EPSG:32643</SRS>' +
'      <SRS>EPSG:32644</SRS>' +
'      <SRS>EPSG:32645</SRS>' +
'      <SRS>EPSG:32646</SRS>' +
'      <SRS>EPSG:32647</SRS>' +
'      <SRS>EPSG:32648</SRS>' +
'      <SRS>EPSG:32649</SRS>' +
'      <SRS>EPSG:32650</SRS>' +
'      <SRS>EPSG:32651</SRS>' +
'      <SRS>EPSG:32652</SRS>' +
'      <SRS>EPSG:32653</SRS>' +
'      <SRS>EPSG:32654</SRS>' +
'      <SRS>EPSG:32655</SRS>' +
'      <SRS>EPSG:32656</SRS>' +
'      <SRS>EPSG:32657</SRS>' +
'      <SRS>EPSG:32658</SRS>' +
'      <SRS>EPSG:32659</SRS>' +
'      <SRS>EPSG:32660</SRS>' +
'      <SRS>EPSG:32661</SRS>' +
'      <SRS>EPSG:32662</SRS>' +
'      <SRS>EPSG:32664</SRS>' +
'      <SRS>EPSG:32665</SRS>' +
'      <SRS>EPSG:32666</SRS>' +
'      <SRS>EPSG:32667</SRS>' +
'      <SRS>EPSG:32700</SRS>' +
'      <SRS>EPSG:32701</SRS>' +
'      <SRS>EPSG:32702</SRS>' +
'      <SRS>EPSG:32703</SRS>' +
'      <SRS>EPSG:32704</SRS>' +
'      <SRS>EPSG:32705</SRS>' +
'      <SRS>EPSG:32706</SRS>' +
'      <SRS>EPSG:32707</SRS>' +
'      <SRS>EPSG:32708</SRS>' +
'      <SRS>EPSG:32709</SRS>' +
'      <SRS>EPSG:32710</SRS>' +
'      <SRS>EPSG:32711</SRS>' +
'      <SRS>EPSG:32712</SRS>' +
'      <SRS>EPSG:32713</SRS>' +
'      <SRS>EPSG:32714</SRS>' +
'      <SRS>EPSG:32715</SRS>' +
'      <SRS>EPSG:32716</SRS>' +
'      <SRS>EPSG:32717</SRS>' +
'      <SRS>EPSG:32718</SRS>' +
'      <SRS>EPSG:32719</SRS>' +
'      <SRS>EPSG:32720</SRS>' +
'      <SRS>EPSG:32721</SRS>' +
'      <SRS>EPSG:32722</SRS>' +
'      <SRS>EPSG:32723</SRS>' +
'      <SRS>EPSG:32724</SRS>' +
'      <SRS>EPSG:32725</SRS>' +
'      <SRS>EPSG:32726</SRS>' +
'      <SRS>EPSG:32727</SRS>' +
'      <SRS>EPSG:32728</SRS>' +
'      <SRS>EPSG:32729</SRS>' +
'      <SRS>EPSG:32730</SRS>' +
'      <SRS>EPSG:32731</SRS>' +
'      <SRS>EPSG:32732</SRS>' +
'      <SRS>EPSG:32733</SRS>' +
'      <SRS>EPSG:32734</SRS>' +
'      <SRS>EPSG:32735</SRS>' +
'      <SRS>EPSG:32736</SRS>' +
'      <SRS>EPSG:32737</SRS>' +
'      <SRS>EPSG:32738</SRS>' +
'      <SRS>EPSG:32739</SRS>' +
'      <SRS>EPSG:32740</SRS>' +
'      <SRS>EPSG:32741</SRS>' +
'      <SRS>EPSG:32742</SRS>' +
'      <SRS>EPSG:32743</SRS>' +
'      <SRS>EPSG:32744</SRS>' +
'      <SRS>EPSG:32745</SRS>' +
'      <SRS>EPSG:32746</SRS>' +
'      <SRS>EPSG:32747</SRS>' +
'      <SRS>EPSG:32748</SRS>' +
'      <SRS>EPSG:32749</SRS>' +
'      <SRS>EPSG:32750</SRS>' +
'      <SRS>EPSG:32751</SRS>' +
'      <SRS>EPSG:32752</SRS>' +
'      <SRS>EPSG:32753</SRS>' +
'      <SRS>EPSG:32754</SRS>' +
'      <SRS>EPSG:32755</SRS>' +
'      <SRS>EPSG:32756</SRS>' +
'      <SRS>EPSG:32757</SRS>' +
'      <SRS>EPSG:32758</SRS>' +
'      <SRS>EPSG:32759</SRS>' +
'      <SRS>EPSG:32760</SRS>' +
'      <SRS>EPSG:32761</SRS>' +
'      <SRS>EPSG:32766</SRS>' +
'      <SRS>EPSG:61206405</SRS>' +
'      <SRS>EPSG:61216405</SRS>' +
'      <SRS>EPSG:61226405</SRS>' +
'      <SRS>EPSG:61236405</SRS>' +
'      <SRS>EPSG:61246405</SRS>' +
'      <SRS>EPSG:61266405</SRS>' +
'      <SRS>EPSG:61266413</SRS>' +
'      <SRS>EPSG:61276405</SRS>' +
'      <SRS>EPSG:61286405</SRS>' +
'      <SRS>EPSG:61296405</SRS>' +
'      <SRS>EPSG:61306405</SRS>' +
'      <SRS>EPSG:61306413</SRS>' +
'      <SRS>EPSG:61316405</SRS>' +
'      <SRS>EPSG:61326405</SRS>' +
'      <SRS>EPSG:61336405</SRS>' +
'      <SRS>EPSG:61346405</SRS>' +
'      <SRS>EPSG:61356405</SRS>' +
'      <SRS>EPSG:61366405</SRS>' +
'      <SRS>EPSG:61376405</SRS>' +
'      <SRS>EPSG:61386405</SRS>' +
'      <SRS>EPSG:61396405</SRS>' +
'      <SRS>EPSG:61406405</SRS>' +
'      <SRS>EPSG:61406413</SRS>' +
'      <SRS>EPSG:61416405</SRS>' +
'      <SRS>EPSG:61426405</SRS>' +
'      <SRS>EPSG:61436405</SRS>' +
'      <SRS>EPSG:61446405</SRS>' +
'      <SRS>EPSG:61456405</SRS>' +
'      <SRS>EPSG:61466405</SRS>' +
'      <SRS>EPSG:61476405</SRS>' +
'      <SRS>EPSG:61486405</SRS>' +
'      <SRS>EPSG:61486413</SRS>' +
'      <SRS>EPSG:61496405</SRS>' +
'      <SRS>EPSG:61506405</SRS>' +
'      <SRS>EPSG:61516405</SRS>' +
'      <SRS>EPSG:61516413</SRS>' +
'      <SRS>EPSG:61526405</SRS>' +
'      <SRS>EPSG:61526413</SRS>' +
'      <SRS>EPSG:61536405</SRS>' +
'      <SRS>EPSG:61546405</SRS>' +
'      <SRS>EPSG:61556405</SRS>' +
'      <SRS>EPSG:61566405</SRS>' +
'      <SRS>EPSG:61576405</SRS>' +
'      <SRS>EPSG:61586405</SRS>' +
'      <SRS>EPSG:61596405</SRS>' +
'      <SRS>EPSG:61606405</SRS>' +
'      <SRS>EPSG:61616405</SRS>' +
'      <SRS>EPSG:61626405</SRS>' +
'      <SRS>EPSG:61636405</SRS>' +
'      <SRS>EPSG:61636413</SRS>' +
'      <SRS>EPSG:61646405</SRS>' +
'      <SRS>EPSG:61656405</SRS>' +
'      <SRS>EPSG:61666405</SRS>' +
'      <SRS>EPSG:61676405</SRS>' +
'      <SRS>EPSG:61676413</SRS>' +
'      <SRS>EPSG:61686405</SRS>' +
'      <SRS>EPSG:61696405</SRS>' +
'      <SRS>EPSG:61706405</SRS>' +
'      <SRS>EPSG:61706413</SRS>' +
'      <SRS>EPSG:61716405</SRS>' +
'      <SRS>EPSG:61716413</SRS>' +
'      <SRS>EPSG:61736405</SRS>' +
'      <SRS>EPSG:61736413</SRS>' +
'      <SRS>EPSG:61746405</SRS>' +
'      <SRS>EPSG:61756405</SRS>' +
'      <SRS>EPSG:61766405</SRS>' +
'      <SRS>EPSG:61766413</SRS>' +
'      <SRS>EPSG:61786405</SRS>' +
'      <SRS>EPSG:61796405</SRS>' +
'      <SRS>EPSG:61806405</SRS>' +
'      <SRS>EPSG:61806413</SRS>' +
'      <SRS>EPSG:61816405</SRS>' +
'      <SRS>EPSG:61826405</SRS>' +
'      <SRS>EPSG:61836405</SRS>' +
'      <SRS>EPSG:61846405</SRS>' +
'      <SRS>EPSG:61886405</SRS>' +
'      <SRS>EPSG:61896405</SRS>' +
'      <SRS>EPSG:61896413</SRS>' +
'      <SRS>EPSG:61906405</SRS>' +
'      <SRS>EPSG:61906413</SRS>' +
'      <SRS>EPSG:61916405</SRS>' +
'      <SRS>EPSG:61926405</SRS>' +
'      <SRS>EPSG:61936405</SRS>' +
'      <SRS>EPSG:61946405</SRS>' +
'      <SRS>EPSG:61956405</SRS>' +
'      <SRS>EPSG:61966405</SRS>' +
'      <SRS>EPSG:61976405</SRS>' +
'      <SRS>EPSG:61986405</SRS>' +
'      <SRS>EPSG:61996405</SRS>' +
'      <SRS>EPSG:62006405</SRS>' +
'      <SRS>EPSG:62016405</SRS>' +
'      <SRS>EPSG:62026405</SRS>' +
'      <SRS>EPSG:62036405</SRS>' +
'      <SRS>EPSG:62046405</SRS>' +
'      <SRS>EPSG:62056405</SRS>' +
'      <SRS>EPSG:62066405</SRS>' +
'      <SRS>EPSG:62076405</SRS>' +
'      <SRS>EPSG:62086405</SRS>' +
'      <SRS>EPSG:62096405</SRS>' +
'      <SRS>EPSG:62106405</SRS>' +
'      <SRS>EPSG:62116405</SRS>' +
'      <SRS>EPSG:62126405</SRS>' +
'      <SRS>EPSG:62136405</SRS>' +
'      <SRS>EPSG:62146405</SRS>' +
'      <SRS>EPSG:62156405</SRS>' +
'      <SRS>EPSG:62166405</SRS>' +
'      <SRS>EPSG:62186405</SRS>' +
'      <SRS>EPSG:62196405</SRS>' +
'      <SRS>EPSG:62206405</SRS>' +
'      <SRS>EPSG:62216405</SRS>' +
'      <SRS>EPSG:62226405</SRS>' +
'      <SRS>EPSG:62236405</SRS>' +
'      <SRS>EPSG:62246405</SRS>' +
'      <SRS>EPSG:62256405</SRS>' +
'      <SRS>EPSG:62276405</SRS>' +
'      <SRS>EPSG:62296405</SRS>' +
'      <SRS>EPSG:62306405</SRS>' +
'      <SRS>EPSG:62316405</SRS>' +
'      <SRS>EPSG:62326405</SRS>' +
'      <SRS>EPSG:62336405</SRS>' +
'      <SRS>EPSG:62366405</SRS>' +
'      <SRS>EPSG:62376405</SRS>' +
'      <SRS>EPSG:62386405</SRS>' +
'      <SRS>EPSG:62396405</SRS>' +
'      <SRS>EPSG:62406405</SRS>' +
'      <SRS>EPSG:62416405</SRS>' +
'      <SRS>EPSG:62426405</SRS>' +
'      <SRS>EPSG:62436405</SRS>' +
'      <SRS>EPSG:62446405</SRS>' +
'      <SRS>EPSG:62456405</SRS>' +
'      <SRS>EPSG:62466405</SRS>' +
'      <SRS>EPSG:62476405</SRS>' +
'      <SRS>EPSG:62486405</SRS>' +
'      <SRS>EPSG:62496405</SRS>' +
'      <SRS>EPSG:62506405</SRS>' +
'      <SRS>EPSG:62516405</SRS>' +
'      <SRS>EPSG:62526405</SRS>' +
'      <SRS>EPSG:62536405</SRS>' +
'      <SRS>EPSG:62546405</SRS>' +
'      <SRS>EPSG:62556405</SRS>' +
'      <SRS>EPSG:62566405</SRS>' +
'      <SRS>EPSG:62576405</SRS>' +
'      <SRS>EPSG:62586405</SRS>' +
'      <SRS>EPSG:62586413</SRS>' +
'      <SRS>EPSG:62596405</SRS>' +
'      <SRS>EPSG:62616405</SRS>' +
'      <SRS>EPSG:62626405</SRS>' +
'      <SRS>EPSG:62636405</SRS>' +
'      <SRS>EPSG:62646405</SRS>' +
'      <SRS>EPSG:62656405</SRS>' +
'      <SRS>EPSG:62666405</SRS>' +
'      <SRS>EPSG:62676405</SRS>' +
'      <SRS>EPSG:62686405</SRS>' +
'      <SRS>EPSG:62696405</SRS>' +
'      <SRS>EPSG:62706405</SRS>' +
'      <SRS>EPSG:62716405</SRS>' +
'      <SRS>EPSG:62726405</SRS>' +
'      <SRS>EPSG:62736405</SRS>' +
'      <SRS>EPSG:62746405</SRS>' +
'      <SRS>EPSG:62756405</SRS>' +
'      <SRS>EPSG:62766405</SRS>' +
'      <SRS>EPSG:62776405</SRS>' +
'      <SRS>EPSG:62786405</SRS>' +
'      <SRS>EPSG:62796405</SRS>' +
'      <SRS>EPSG:62806405</SRS>' +
'      <SRS>EPSG:62816405</SRS>' +
'      <SRS>EPSG:62826405</SRS>' +
'      <SRS>EPSG:62836405</SRS>' +
'      <SRS>EPSG:62836413</SRS>' +
'      <SRS>EPSG:62846405</SRS>' +
'      <SRS>EPSG:62856405</SRS>' +
'      <SRS>EPSG:62866405</SRS>' +
'      <SRS>EPSG:62886405</SRS>' +
'      <SRS>EPSG:62896405</SRS>' +
'      <SRS>EPSG:62926405</SRS>' +
'      <SRS>EPSG:62936405</SRS>' +
'      <SRS>EPSG:62956405</SRS>' +
'      <SRS>EPSG:62976405</SRS>' +
'      <SRS>EPSG:62986405</SRS>' +
'      <SRS>EPSG:62996405</SRS>' +
'      <SRS>EPSG:63006405</SRS>' +
'      <SRS>EPSG:63016405</SRS>' +
'      <SRS>EPSG:63026405</SRS>' +
'      <SRS>EPSG:63036405</SRS>' +
'      <SRS>EPSG:63046405</SRS>' +
'      <SRS>EPSG:63066405</SRS>' +
'      <SRS>EPSG:63076405</SRS>' +
'      <SRS>EPSG:63086405</SRS>' +
'      <SRS>EPSG:63096405</SRS>' +
'      <SRS>EPSG:63106405</SRS>' +
'      <SRS>EPSG:63116405</SRS>' +
'      <SRS>EPSG:63126405</SRS>' +
'      <SRS>EPSG:63136405</SRS>' +
'      <SRS>EPSG:63146405</SRS>' +
'      <SRS>EPSG:63156405</SRS>' +
'      <SRS>EPSG:63166405</SRS>' +
'      <SRS>EPSG:63176405</SRS>' +
'      <SRS>EPSG:63186405</SRS>' +
'      <SRS>EPSG:63196405</SRS>' +
'      <SRS>EPSG:63226405</SRS>' +
'      <SRS>EPSG:63246405</SRS>' +
'      <SRS>EPSG:63266405</SRS>' +
'      <SRS>EPSG:63266406</SRS>' +
'      <SRS>EPSG:63266407</SRS>' +
'      <SRS>EPSG:63266408</SRS>' +
'      <SRS>EPSG:63266409</SRS>' +
'      <SRS>EPSG:63266410</SRS>' +
'      <SRS>EPSG:63266411</SRS>' +
'      <SRS>EPSG:63266412</SRS>' +
'      <SRS>EPSG:63266413</SRS>' +
'      <SRS>EPSG:63266414</SRS>' +
'      <SRS>EPSG:63266415</SRS>' +
'      <SRS>EPSG:63266416</SRS>' +
'      <SRS>EPSG:63266417</SRS>' +
'      <SRS>EPSG:63266418</SRS>' +
'      <SRS>EPSG:63266419</SRS>' +
'      <SRS>EPSG:63266420</SRS>' +
'      <SRS>EPSG:66006405</SRS>' +
'      <SRS>EPSG:66016405</SRS>' +
'      <SRS>EPSG:66026405</SRS>' +
'      <SRS>EPSG:66036405</SRS>' +
'      <SRS>EPSG:66046405</SRS>' +
'      <SRS>EPSG:66056405</SRS>' +
'      <SRS>EPSG:66066405</SRS>' +
'      <SRS>EPSG:66076405</SRS>' +
'      <SRS>EPSG:66086405</SRS>' +
'      <SRS>EPSG:66096405</SRS>' +
'      <SRS>EPSG:66106405</SRS>' +
'      <SRS>EPSG:66116405</SRS>' +
'      <SRS>EPSG:66126405</SRS>' +
'      <SRS>EPSG:66126413</SRS>' +
'      <SRS>EPSG:66136405</SRS>' +
'      <SRS>EPSG:66146405</SRS>' +
'      <SRS>EPSG:66156405</SRS>' +
'      <SRS>EPSG:66166405</SRS>' +
'      <SRS>EPSG:66186405</SRS>' +
'      <SRS>EPSG:66196405</SRS>' +
'      <SRS>EPSG:66196413</SRS>' +
'      <SRS>EPSG:66206405</SRS>' +
'      <SRS>EPSG:66216405</SRS>' +
'      <SRS>EPSG:66226405</SRS>' +
'      <SRS>EPSG:66236405</SRS>' +
'      <SRS>EPSG:66246405</SRS>' +
'      <SRS>EPSG:66246413</SRS>' +
'      <SRS>EPSG:66256405</SRS>' +
'      <SRS>EPSG:66266405</SRS>' +
'      <SRS>EPSG:66276405</SRS>' +
'      <SRS>EPSG:66276413</SRS>' +
'      <SRS>EPSG:66286405</SRS>' +
'      <SRS>EPSG:66296405</SRS>' +
'      <SRS>EPSG:66306405</SRS>' +
'      <SRS>EPSG:66316405</SRS>' +
'      <SRS>EPSG:66326405</SRS>' +
'      <SRS>EPSG:66336405</SRS>' +
'      <SRS>EPSG:66346405</SRS>' +
'      <SRS>EPSG:66356405</SRS>' +
'      <SRS>EPSG:66366405</SRS>' +
'      <SRS>EPSG:66376405</SRS>' +
'      <SRS>EPSG:66386405</SRS>' +
'      <SRS>EPSG:66396405</SRS>' +
'      <SRS>EPSG:66406405</SRS>' +
'      <SRS>EPSG:66406413</SRS>' +
'      <SRS>EPSG:66416405</SRS>' +
'      <SRS>EPSG:66426405</SRS>' +
'      <SRS>EPSG:66436405</SRS>' +
'      <SRS>EPSG:66446405</SRS>' +
'      <SRS>EPSG:66456405</SRS>' +
'      <SRS>EPSG:66456413</SRS>' +
'      <SRS>EPSG:66466405</SRS>' +
'      <SRS>EPSG:66576405</SRS>' +
'      <SRS>EPSG:66586405</SRS>' +
'      <SRS>EPSG:66596405</SRS>' +
'      <SRS>EPSG:66596413</SRS>' +
'      <SRS>EPSG:66606405</SRS>' +
'      <SRS>EPSG:66616405</SRS>' +
'      <SRS>EPSG:66616413</SRS>' +
'      <SRS>EPSG:66636405</SRS>' +
'      <SRS>EPSG:66646405</SRS>' +
'      <SRS>EPSG:66656405</SRS>' +
'      <SRS>EPSG:66666405</SRS>' +
'      <SRS>EPSG:66676405</SRS>' +
'      <SRS>EPSG:68016405</SRS>' +
'      <SRS>EPSG:68026405</SRS>' +
'      <SRS>EPSG:68036405</SRS>' +
'      <SRS>EPSG:68046405</SRS>' +
'      <SRS>EPSG:68056405</SRS>' +
'      <SRS>EPSG:68066405</SRS>' +
'      <SRS>EPSG:68086405</SRS>' +
'      <SRS>EPSG:68096405</SRS>' +
'      <SRS>EPSG:68136405</SRS>' +
'      <SRS>EPSG:68146405</SRS>' +
'      <SRS>EPSG:68156405</SRS>' +
'      <SRS>EPSG:68186405</SRS>' +
'      <SRS>EPSG:68206405</SRS>' +
'      <SRS>EPSG:69036405</SRS>' +
'      <SRS>EPSG:42302</SRS>' +
'      <SRS>EPSG:42301</SRS>' +
'      <SRS>EPSG:900913</SRS>' +
'      <SRS>EPSG:45556</SRS>' +
'      <SRS>EPSG:45555</SRS>' +
'      <SRS>EPSG:54004</SRS>' +
'      <SRS>EPSG:41001</SRS>' +
'      <SRS>EPSG:42311</SRS>' +
'      <SRS>EPSG:42310</SRS>' +
'      <SRS>EPSG:18001</SRS>' +
'      <SRS>EPSG:100003</SRS>' +
'      <SRS>EPSG:42106</SRS>' +
'      <SRS>EPSG:100002</SRS>' +
'      <SRS>EPSG:42105</SRS>' +
'      <SRS>EPSG:100001</SRS>' +
'      <SRS>EPSG:42309</SRS>' +
'      <SRS>EPSG:42104</SRS>' +
'      <SRS>EPSG:42308</SRS>' +
'      <SRS>EPSG:42103</SRS>' +
'      <SRS>EPSG:42307</SRS>' +
'      <SRS>EPSG:42102</SRS>' +
'      <SRS>EPSG:42306</SRS>' +
'      <SRS>EPSG:42101</SRS>' +
'      <SRS>EPSG:42305</SRS>' +
'      <SRS>EPSG:42304</SRS>' +
'      <SRS>EPSG:42303</SRS>' +
'      <LatLonBoundingBox minx="-297176.16529836657" miny="-1.2694600326676274E7" maxx="3.0016785704606913E7" maxy="1.7619361543229006E7"/>' +
'      <Layer queryable="1">' +
'        <Name>og:bugsites</Name>' +
'        <Title/>' +
'        <Abstract>Sample data from GRASS, bug sites location, Spearfish, South Dakota, USA</Abstract>' +
'        <KeywordList>' +
'          <Keyword>spearfish</Keyword>' +
'          <Keyword>sfBugsites</Keyword>' +
'          <Keyword>insects</Keyword>' +
'          <Keyword>bugsites</Keyword>' +
'          <Keyword>tiger_beetles</Keyword>' +
'        </KeywordList>' +
'        <SRS>EPSG:26713</SRS>' +
'        <!--WKT definition of this CRS:' +
'PROJCS["NAD27 / UTM zone 13N", ' +
'  GEOGCS["NAD27", ' +
'    DATUM["North American Datum 1927", ' +
'      SPHEROID["Clarke 1866", 6378206.4, 294.9786982138982, AUTHORITY["EPSG","7008"]], ' +
'      TOWGS84[-4.2, 135.4, 181.9, 0.0, 0.0, 0.0, 0.0], ' +
'      AUTHORITY["EPSG","6267"]], ' +
'    PRIMEM["Greenwich", 0.0, AUTHORITY["EPSG","8901"]], ' +
'    UNIT["degree", 0.017453292519943295], ' +
'    AXIS["Geodetic longitude", EAST], ' +
'    AXIS["Geodetic latitude", NORTH], ' +
'    AUTHORITY["EPSG","4267"]], ' +
'  PROJECTION["Transverse Mercator", AUTHORITY["EPSG","9807"]], ' +
'  PARAMETER["central_meridian", -105.0], ' +
'  PARAMETER["latitude_of_origin", 0.0], ' +
'  PARAMETER["scale_factor", 0.9996], ' +
'  PARAMETER["false_easting", 500000.0], ' +
'  PARAMETER["false_northing", 0.0], ' +
'  UNIT["m", 1.0], ' +
'  AXIS["Easting", EAST], ' +
'  AXIS["Northing", NORTH], ' +
'  AUTHORITY["EPSG","26713"]]-->' +
'        <LatLonBoundingBox minx="-103.8701581843142" miny="44.286540361238224" maxx="-103.63532819794625" maxy="44.52137034760618"/>' +
'        <BoundingBox SRS="EPSG:26713" minx="590232.0" miny="4914096.0" maxx="608471.0" maxy="4920512.0"/>' +
'        <Style>' +
'          <Name>capitals</Name>' +
'          <Title>Capital cities</Title>' +
'          <Abstract/>' +
'          <LegendURL width="20" height="20">' +
'            <Format>image/png</Format>' +
'            <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://demo.boundlessgeo.com/geoserver/wms/GetLegendGraphic?VERSION=1.0.0&amp;FORMAT=image/png&amp;WIDTH=20&amp;HEIGHT=20&amp;LAYER=og:bugsites"/>' +
'          </LegendURL>' +
'        </Style>' +
'      </Layer>' +
'      <Layer queryable="1">' +
'        <Name>og:restricted</Name>' +
'        <Title/>' +
'        <Abstract>Sample data from GRASS, restricted areas, Spearfish, South Dakota, USA</Abstract>' +
'        <KeywordList>' +
'          <Keyword>spearfish</Keyword>' +
'          <Keyword>restricted</Keyword>' +
'          <Keyword>sfRestricted</Keyword>' +
'          <Keyword>areas</Keyword>' +
'        </KeywordList>' +
'        <SRS>EPSG:26713</SRS>' +
'        <!--WKT definition of this CRS:' +
'PROJCS["NAD27 / UTM zone 13N", ' +
'  GEOGCS["NAD27", ' +
'    DATUM["North American Datum 1927", ' +
'      SPHEROID["Clarke 1866", 6378206.4, 294.9786982138982, AUTHORITY["EPSG","7008"]], ' +
'      TOWGS84[-4.2, 135.4, 181.9, 0.0, 0.0, 0.0, 0.0], ' +
'      AUTHORITY["EPSG","6267"]], ' +
'    PRIMEM["Greenwich", 0.0, AUTHORITY["EPSG","8901"]], ' +
'    UNIT["degree", 0.017453292519943295], ' +
'    AXIS["Geodetic longitude", EAST], ' +
'    AXIS["Geodetic latitude", NORTH], ' +
'    AUTHORITY["EPSG","4267"]], ' +
'  PROJECTION["Transverse Mercator", AUTHORITY["EPSG","9807"]], ' +
'  PARAMETER["central_meridian", -105.0], ' +
'  PARAMETER["latitude_of_origin", 0.0], ' +
'  PARAMETER["scale_factor", 0.9996], ' +
'  PARAMETER["false_easting", 500000.0], ' +
'  PARAMETER["false_northing", 0.0], ' +
'  UNIT["m", 1.0], ' +
'  AXIS["Easting", EAST], ' +
'  AXIS["Northing", NORTH], ' +
'  AUTHORITY["EPSG","26713"]]-->' +
'        <LatLonBoundingBox minx="-104.36424600670885" miny="43.78798270975212" maxx="-103.06226503558304" maxy="45.089963680877936"/>' +
'        <BoundingBox SRS="EPSG:26713" minx="551796.8125" miny="4901896.0" maxx="652788.5625" maxy="4940954.0"/>' +
'        <Style>' +
'          <Name>restricted</Name>' +
'          <Title>Red, translucent style</Title>' +
'          <Abstract>A sample style that just prints out a transparent red interior with a red outline</Abstract>' +
'          <LegendURL width="20" height="20">' +
'            <Format>image/png</Format>' +
'            <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://demo.boundlessgeo.com/geoserver/wms/GetLegendGraphic?VERSION=1.0.0&amp;FORMAT=image/png&amp;WIDTH=20&amp;HEIGHT=20&amp;LAYER=og:restricted"/>' +
'          </LegendURL>' +
'        </Style>' +
'      </Layer>' +
'      <Layer queryable="1">' +
'        <Name>og:archsites</Name>' +
'        <Title/>' +
'        <Abstract>Sample data from GRASS, archeological sites location, Spearfish, South Dakota, USA</Abstract>' +
'        <KeywordList>' +
'          <Keyword>archsites</Keyword>' +
'          <Keyword>spearfish</Keyword>' +
'          <Keyword>sfArchsites</Keyword>' +
'          <Keyword>archeology</Keyword>' +
'        </KeywordList>' +
'        <SRS>EPSG:26713</SRS>' +
'        <!--WKT definition of this CRS:' +
'PROJCS["NAD27 / UTM zone 13N", ' +
'  GEOGCS["NAD27", ' +
'    DATUM["North American Datum 1927", ' +
'      SPHEROID["Clarke 1866", 6378206.4, 294.9786982138982, AUTHORITY["EPSG","7008"]], ' +
'      TOWGS84[-4.2, 135.4, 181.9, 0.0, 0.0, 0.0, 0.0], ' +
'      AUTHORITY["EPSG","6267"]], ' +
'    PRIMEM["Greenwich", 0.0, AUTHORITY["EPSG","8901"]], ' +
'    UNIT["degree", 0.017453292519943295], ' +
'    AXIS["Geodetic longitude", EAST], ' +
'    AXIS["Geodetic latitude", NORTH], ' +
'    AUTHORITY["EPSG","4267"]], ' +
'  PROJECTION["Transverse Mercator", AUTHORITY["EPSG","9807"]], ' +
'  PARAMETER["central_meridian", -105.0], ' +
'  PARAMETER["latitude_of_origin", 0.0], ' +
'  PARAMETER["scale_factor", 0.9996], ' +
'  PARAMETER["false_easting", 500000.0], ' +
'  PARAMETER["false_northing", 0.0], ' +
'  UNIT["m", 1.0], ' +
'  AXIS["Easting", EAST], ' +
'  AXIS["Northing", NORTH], ' +
'  AUTHORITY["EPSG","26713"]]-->' +
'        <LatLonBoundingBox minx="-103.87480459767542" miny="44.31295793136913" maxx="-103.63549073047534" maxy="44.55227179856921"/>' +
'        <BoundingBox SRS="EPSG:26713" minx="589860.0" miny="4914479.0" maxx="608355.0" maxy="4926490.0"/>' +
'        <Style>' +
'          <Name>point</Name>' +
'          <Title>Default point</Title>' +
'          <Abstract>A sample style that just prints out a 6px wide red square</Abstract>' +
'          <LegendURL width="20" height="20">' +
'            <Format>image/png</Format>' +
'            <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://demo.boundlessgeo.com/geoserver/wms/GetLegendGraphic?VERSION=1.0.0&amp;FORMAT=image/png&amp;WIDTH=20&amp;HEIGHT=20&amp;LAYER=og:archsites"/>' +
'          </LegendURL>' +
'        </Style>' +
'      </Layer>' +
'      <Layer queryable="1">' +
'        <Name>og:streams</Name>' +
'        <Title/>' +
'        <Abstract>Sample data from GRASS, streams, Spearfish, South Dakota, USA</Abstract>' +
'        <KeywordList>' +
'          <Keyword>spearfish</Keyword>' +
'          <Keyword>sfStreams</Keyword>' +
'          <Keyword>streams</Keyword>' +
'        </KeywordList>' +
'        <SRS>EPSG:26713</SRS>' +
'        <!--WKT definition of this CRS:' +
'PROJCS["NAD27 / UTM zone 13N", ' +
'  GEOGCS["NAD27", ' +
'    DATUM["North American Datum 1927", ' +
'      SPHEROID["Clarke 1866", 6378206.4, 294.9786982138982, AUTHORITY["EPSG","7008"]], ' +
'      TOWGS84[-4.2, 135.4, 181.9, 0.0, 0.0, 0.0, 0.0], ' +
'      AUTHORITY["EPSG","6267"]], ' +
'    PRIMEM["Greenwich", 0.0, AUTHORITY["EPSG","8901"]], ' +
'    UNIT["degree", 0.017453292519943295], ' +
'    AXIS["Geodetic longitude", EAST], ' +
'    AXIS["Geodetic latitude", NORTH], ' +
'    AUTHORITY["EPSG","4267"]], ' +
'  PROJECTION["Transverse Mercator", AUTHORITY["EPSG","9807"]], ' +
'  PARAMETER["central_meridian", -105.0], ' +
'  PARAMETER["latitude_of_origin", 0.0], ' +
'  PARAMETER["scale_factor", 0.9996], ' +
'  PARAMETER["false_easting", 500000.0], ' +
'  PARAMETER["false_northing", 0.0], ' +
'  UNIT["m", 1.0], ' +
'  AXIS["Easting", EAST], ' +
'  AXIS["Northing", NORTH], ' +
'  AUTHORITY["EPSG","26713"]]-->' +
'        <LatLonBoundingBox minx="-103.88033574142051" miny="44.30711172484593" maxx="-103.62022283326024" maxy="44.5672246330062"/>' +
'        <BoundingBox SRS="EPSG:26713" minx="589443.0" miny="4913935.0" maxx="609526.75" maxy="4928059.5"/>' +
'        <Style>' +
'          <Name>simple_streams</Name>' +
'          <Title>Default Styler for streams segments</Title>' +
'          <Abstract>Blue lines, 2px wide</Abstract>' +
'          <LegendURL width="20" height="20">' +
'            <Format>image/png</Format>' +
'            <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://demo.boundlessgeo.com/geoserver/wms/GetLegendGraphic?VERSION=1.0.0&amp;FORMAT=image/png&amp;WIDTH=20&amp;HEIGHT=20&amp;LAYER=og:streams"/>' +
'          </LegendURL>' +
'        </Style>' +
'      </Layer>' +
'      <Layer queryable="1">' +
'        <Name>tiger:poly_landmarks</Name>' +
'        <Title>Manhattan (NY) landmarks</Title>' +
'        <Abstract>Manhattan landmarks, identifies water, lakes, parks, interesting buildilngs</Abstract>' +
'        <KeywordList>' +
'          <Keyword>DS_poly_landmarks</Keyword>' +
'          <Keyword>landmarks</Keyword>' +
'          <Keyword>manhattan</Keyword>' +
'          <Keyword>poly_landmarks</Keyword>' +
'        </KeywordList>' +
'        <SRS>EPSG:4326</SRS>' +
'        <!--WKT definition of this CRS:' +
'GEOGCS["WGS 84", ' +
'  DATUM["World Geodetic System 1984", ' +
'    SPHEROID["WGS 84", 6378137.0, 298.257223563, AUTHORITY["EPSG","7030"]], ' +
'    AUTHORITY["EPSG","6326"]], ' +
'  PRIMEM["Greenwich", 0.0, AUTHORITY["EPSG","8901"]], ' +
'  UNIT["degree", 0.017453292519943295], ' +
'  AXIS["Geodetic longitude", EAST], ' +
'  AXIS["Geodetic latitude", NORTH], ' +
'  AUTHORITY["EPSG","4326"]]-->' +
'        <LatLonBoundingBox minx="-74.0828672737" miny="40.67246384130001" maxx="-73.8660689563" maxy="40.8892621587"/>' +
'        <BoundingBox SRS="EPSG:4326" minx="-74.047185" miny="40.679648" maxx="-73.90782" maxy="40.882078"/>' +
'        <Style>' +
'          <Name>poly_landmarks</Name>' +
'          <Title>Default Styler</Title>' +
'          <Abstract/>' +
'          <LegendURL width="20" height="20">' +
'            <Format>image/png</Format>' +
'            <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://demo.boundlessgeo.com/geoserver/wms/GetLegendGraphic?VERSION=1.0.0&amp;FORMAT=image/png&amp;WIDTH=20&amp;HEIGHT=20&amp;LAYER=tiger:poly_landmarks"/>' +
'          </LegendURL>' +
'        </Style>' +
'      </Layer>' +
'      <Layer queryable="1">' +
'        <Name>tiger:poi</Name>' +
'        <Title>Manhattan (NY) points of interest</Title>' +
'        <Abstract>Points of interest in New York, New York (on Manhattan). One of the attributes contains the name of a file with a picture of the point of interest.</Abstract>' +
'        <KeywordList>' +
'          <Keyword>poi</Keyword>' +
'          <Keyword>Manhattan</Keyword>' +
'          <Keyword>DS_poi</Keyword>' +
'          <Keyword>points_of_interest</Keyword>' +
'        </KeywordList>' +
'        <SRS>EPSG:4326</SRS>' +
'        <!--WKT definition of this CRS:' +
'GEOGCS["WGS 84", ' +
'  DATUM["World Geodetic System 1984", ' +
'    SPHEROID["WGS 84", 6378137.0, 298.257223563, AUTHORITY["EPSG","7030"]], ' +
'    AUTHORITY["EPSG","6326"]], ' +
'  PRIMEM["Greenwich", 0.0, AUTHORITY["EPSG","8901"]], ' +
'  UNIT["degree", 0.017453292519943295], ' +
'  AXIS["Geodetic longitude", EAST], ' +
'  AXIS["Geodetic latitude", NORTH], ' +
'  AUTHORITY["EPSG","4326"]]-->' +
'        <LatLonBoundingBox minx="-74.01244590356289" miny="40.70750285086222" maxx="-74.00795911725866" maxy="40.711989637166425"/>' +
'        <BoundingBox SRS="EPSG:4326" minx="-74.0118315772888" miny="40.70754683896324" maxx="-74.00153046439813" maxy="40.719885123828675"/>' +
'        <Style>' +
'          <Name>poi</Name>' +
'          <Title>Points of interest</Title>' +
'          <Abstract>Manhattan points of interest</Abstract>' +
'          <LegendURL width="20" height="20">' +
'            <Format>image/png</Format>' +
'            <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://demo.boundlessgeo.com/geoserver/wms/GetLegendGraphic?VERSION=1.0.0&amp;FORMAT=image/png&amp;WIDTH=20&amp;HEIGHT=20&amp;LAYER=tiger:poi"/>' +
'          </LegendURL>' +
'        </Style>' +
'      </Layer>' +
'      <Layer queryable="1">' +
'        <Name>tiger:tiger_roads</Name>' +
'        <Title>Manhattan (NY) roads</Title>' +
'        <Abstract>Highly simplified road layout of Manhattan in New York..</Abstract>' +
'        <KeywordList>' +
'          <Keyword>DS_tiger_roads</Keyword>' +
'          <Keyword>tiger_roads</Keyword>' +
'          <Keyword>roads</Keyword>' +
'        </KeywordList>' +
'        <SRS>EPSG:4326</SRS>' +
'        <!--WKT definition of this CRS:' +
'GEOGCS["WGS 84", ' +
'  DATUM["World Geodetic System 1984", ' +
'    SPHEROID["WGS 84", 6378137.0, 298.257223563, AUTHORITY["EPSG","7030"]], ' +
'    AUTHORITY["EPSG","6326"]], ' +
'  PRIMEM["Greenwich", 0.0, AUTHORITY["EPSG","8901"]], ' +
'  UNIT["degree", 0.017453292519943295], ' +
'  AXIS["Geodetic longitude", EAST], ' +
'  AXIS["Geodetic latitude", NORTH], ' +
'  AUTHORITY["EPSG","4326"]]-->' +
'        <LatLonBoundingBox minx="-74.06603057" miny="40.68228143" maxx="-73.86819443" maxy="40.880117569999996"/>' +
'        <BoundingBox SRS="EPSG:4326" minx="-74.02722" miny="40.684221" maxx="-73.907005" maxy="40.878178"/>' +
'        <Style>' +
'          <Name>tiger_roads</Name>' +
'          <Title>Default Styler</Title>' +
'          <Abstract/>' +
'          <LegendURL width="20" height="20">' +
'            <Format>image/png</Format>' +
'            <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://demo.boundlessgeo.com/geoserver/wms/GetLegendGraphic?VERSION=1.0.0&amp;FORMAT=image/png&amp;WIDTH=20&amp;HEIGHT=20&amp;LAYER=tiger:tiger_roads"/>' +
'          </LegendURL>' +
'        </Style>' +
'      </Layer>' +
'      <Layer queryable="1">' +
'        <Name>za:za_natural</Name>' +
'        <Title>Natural Landmarks in South Africa</Title>' +
'        <Abstract>This layer describes natural features of South Africa such as forests and lakes.</Abstract>' +
'        <KeywordList>' +
'          <Keyword>water</Keyword>' +
'          <Keyword>forests</Keyword>' +
'          <Keyword>landmarks</Keyword>' +
'          <Keyword>Africa</Keyword>' +
'          <Keyword>South</Keyword>' +
'          <Keyword>natural</Keyword>' +
'        </KeywordList>' +
'        <SRS>EPSG:4326</SRS>' +
'        <!--WKT definition of this CRS:' +
'GEOGCS["WGS 84", ' +
'  DATUM["World Geodetic System 1984", ' +
'    SPHEROID["WGS 84", 6378137.0, 298.257223563, AUTHORITY["EPSG","7030"]], ' +
'    AUTHORITY["EPSG","6326"]], ' +
'  PRIMEM["Greenwich", 0.0, AUTHORITY["EPSG","8901"]], ' +
'  UNIT["degree", 0.017453292519943295], ' +
'  AXIS["Geodetic longitude", EAST], ' +
'  AXIS["Geodetic latitude", NORTH], ' +
'  AUTHORITY["EPSG","4326"]]-->' +
'        <LatLonBoundingBox minx="16.779241142272962" miny="-36.53577846527099" maxx="32.70336002349853" maxy="-20.611659584045416"/>' +
'        <BoundingBox SRS="EPSG:4326" minx="16.935359954834" miny="-34.3737831115723" maxx="32.5472412109375" maxy="-22.7736549377441"/>' +
'        <Style>' +
'          <Name>za_natural</Name>' +
'          <Title>Default Styler</Title>' +
'          <Abstract/>' +
'          <LegendURL width="20" height="20">' +
'            <Format>image/png</Format>' +
'            <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://demo.boundlessgeo.com/geoserver/wms/GetLegendGraphic?VERSION=1.0.0&amp;FORMAT=image/png&amp;WIDTH=20&amp;HEIGHT=20&amp;LAYER=za:za_natural"/>' +
'          </LegendURL>' +
'        </Style>' +
'      </Layer>' +
'      <Layer queryable="1">' +
'        <Name>za:za_points</Name>' +
'        <Title>Points of Interest in South Africa</Title>' +
'        <Abstract>Noteworthy locations such as hotels and tourist attractions in South Africa.</Abstract>' +
'        <KeywordList>' +
'          <Keyword>of</Keyword>' +
'          <Keyword>tourist</Keyword>' +
'          <Keyword>landmarks</Keyword>' +
'          <Keyword>zoo</Keyword>' +
'          <Keyword>cities</Keyword>' +
'          <Keyword>interest</Keyword>' +
'          <Keyword>attractions</Keyword>' +
'          <Keyword>points</Keyword>' +
'          <Keyword>hotel</Keyword>' +
'          <Keyword>museum</Keyword>' +
'          <Keyword>picnic</Keyword>' +
'        </KeywordList>' +
'        <SRS>EPSG:4326</SRS>' +
'        <!--WKT definition of this CRS:' +
'GEOGCS["WGS 84", ' +
'  DATUM["World Geodetic System 1984", ' +
'    SPHEROID["WGS 84", 6378137.0, 298.257223563, AUTHORITY["EPSG","7030"]], ' +
'    AUTHORITY["EPSG","6326"]], ' +
'  PRIMEM["Greenwich", 0.0, AUTHORITY["EPSG","8901"]], ' +
'  UNIT["degree", 0.017453292519943295], ' +
'  AXIS["Geodetic longitude", EAST], ' +
'  AXIS["Geodetic latitude", NORTH], ' +
'  AUTHORITY["EPSG","4326"]]-->' +
'        <LatLonBoundingBox minx="14.629095230102537" miny="-47.151258316040014" maxx="39.792314376831065" maxy="-21.988039169311488"/>' +
'        <BoundingBox SRS="EPSG:4326" minx="16.4827766418457" miny="-46.9045600891113" maxx="37.9386329650879" maxy="-22.2347373962402"/>' +
'        <Style>' +
'          <Name>za_points</Name>' +
'          <Title>Default Styler</Title>' +
'          <Abstract/>' +
'          <LegendURL width="20" height="20">' +
'            <Format>image/png</Format>' +
'            <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://demo.boundlessgeo.com/geoserver/wms/GetLegendGraphic?VERSION=1.0.0&amp;FORMAT=image/png&amp;WIDTH=20&amp;HEIGHT=20&amp;LAYER=za:za_points"/>' +
'          </LegendURL>' +
'        </Style>' +
'      </Layer>' +
'      <Layer queryable="1">' +
'        <Name>za:za_roads</Name>' +
'        <Title>South African Roads</Title>' +
'        <Abstract>This layer describes roads in South Africa.</Abstract>' +
'        <KeywordList>' +
'          <Keyword>south</Keyword>' +
'          <Keyword>africa</Keyword>' +
'          <Keyword>roads</Keyword>' +
'        </KeywordList>' +
'        <SRS>EPSG:4326</SRS>' +
'        <!--WKT definition of this CRS:' +
'GEOGCS["WGS 84", ' +
'  DATUM["World Geodetic System 1984", ' +
'    SPHEROID["WGS 84", 6378137.0, 298.257223563, AUTHORITY["EPSG","7030"]], ' +
'    AUTHORITY["EPSG","6326"]], ' +
'  PRIMEM["Greenwich", 0.0, AUTHORITY["EPSG","8901"]], ' +
'  UNIT["degree", 0.017453292519943295], ' +
'  AXIS["Geodetic longitude", EAST], ' +
'  AXIS["Geodetic latitude", NORTH], ' +
'  AUTHORITY["EPSG","4326"]]-->' +
'        <LatLonBoundingBox minx="16.29388177871706" miny="-36.85438787460323" maxx="33.04232465744013" maxy="-20.10594499588016"/>' +
'        <BoundingBox SRS="EPSG:4326" minx="16.4580821990967" miny="-34.8331336975098" maxx="32.8781242370605" maxy="-22.1271991729736"/>' +
'        <Style>' +
'          <Name>za_roads</Name>' +
'          <Title>Default Styler</Title>' +
'          <Abstract/>' +
'          <LegendURL width="20" height="20">' +
'            <Format>image/png</Format>' +
'            <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://demo.boundlessgeo.com/geoserver/wms/GetLegendGraphic?VERSION=1.0.0&amp;FORMAT=image/png&amp;WIDTH=20&amp;HEIGHT=20&amp;LAYER=za:za_roads"/>' +
'          </LegendURL>' +
'        </Style>' +
'      </Layer>' +
'      <Layer queryable="1">' +
'        <Name>za:za_vegetation</Name>' +
'        <Title>South African Vegetation</Title>' +
'        <Abstract>This layer describes vegetated areas in South Africa, categorized by biome.</Abstract>' +
'        <KeywordList>' +
'          <Keyword>south</Keyword>' +
'          <Keyword>vegetation</Keyword>' +
'          <Keyword>africa</Keyword>' +
'        </KeywordList>' +
'        <SRS>EPSG:4326</SRS>' +
'        <!--WKT definition of this CRS:' +
'GEOGCS["WGS 84", ' +
'  DATUM["World Geodetic System 1984", ' +
'    SPHEROID["WGS 84", 6378137.0, 298.257223563, AUTHORITY["EPSG","7030"]], ' +
'    AUTHORITY["EPSG","6326"]], ' +
'  PRIMEM["Greenwich", 0.0, AUTHORITY["EPSG","8901"]], ' +
'  UNIT["degree", 0.017453292519943295], ' +
'  AXIS["Geodetic longitude", EAST], ' +
'  AXIS["Geodetic latitude", NORTH], ' +
'  AUTHORITY["EPSG","4326"]]-->' +
'        <LatLonBoundingBox minx="16.30492322921758" miny="-36.855452365875216" maxx="33.05824930191042" maxy="-20.102126293182376"/>' +
'        <BoundingBox SRS="EPSG:4326" minx="16.4691715240479" miny="-34.8336486816406" maxx="32.8940010070801" maxy="-22.123929977417"/>' +
'        <Style>' +
'          <Name>za_vegetation</Name>' +
'          <Title>Default Styler</Title>' +
'          <Abstract/>' +
'          <LegendURL width="20" height="20">' +
'            <Format>image/png</Format>' +
'            <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://demo.boundlessgeo.com/geoserver/wms/GetLegendGraphic?VERSION=1.0.0&amp;FORMAT=image/png&amp;WIDTH=20&amp;HEIGHT=20&amp;LAYER=za:za_vegetation"/>' +
'          </LegendURL>' +
'        </Style>' +
'      </Layer>' +
'      <Layer queryable="1">' +
'        <Name>topp:tasmania_cities</Name>' +
'        <Title>Tasmania cities</Title>' +
'        <Abstract>Cities in Tasmania (actually, just the capital)</Abstract>' +
'        <KeywordList>' +
'          <Keyword>cities</Keyword>' +
'          <Keyword>Tasmania</Keyword>' +
'        </KeywordList>' +
'        <SRS>EPSG:4326</SRS>' +
'        <!--WKT definition of this CRS:' +
'GEOGCS["WGS 84", ' +
'  DATUM["World Geodetic System 1984", ' +
'    SPHEROID["WGS 84", 6378137.0, 298.257223563, AUTHORITY["EPSG","7030"]], ' +
'    AUTHORITY["EPSG","6326"]], ' +
'  PRIMEM["Greenwich", 0.0, AUTHORITY["EPSG","8901"]], ' +
'  UNIT["degree", 0.017453292519943295], ' +
'  AXIS["Geodetic longitude", EAST], ' +
'  AXIS["Geodetic latitude", NORTH], ' +
'  AUTHORITY["EPSG","4326"]]-->' +
'        <LatLonBoundingBox minx="145.1667856" miny="-43.706631400000006" maxx="148.30373440000002" maxy="-40.56968259999999"/>' +
'        <BoundingBox SRS="EPSG:4326" minx="147.2910004483" miny="-42.851001816890005" maxx="147.2910004483" maxy="-42.851001816890005"/>' +
'        <Style>' +
'          <Name>capitals</Name>' +
'          <Title>Capital cities</Title>' +
'          <Abstract/>' +
'          <LegendURL width="20" height="20">' +
'            <Format>image/png</Format>' +
'            <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://demo.boundlessgeo.com/geoserver/wms/GetLegendGraphic?VERSION=1.0.0&amp;FORMAT=image/png&amp;WIDTH=20&amp;HEIGHT=20&amp;LAYER=topp:tasmania_cities"/>' +
'          </LegendURL>' +
'        </Style>' +
'      </Layer>' +
'      <Layer queryable="1">' +
'        <Name>topp:tasmania_roads</Name>' +
'        <Title>Tasmania roads</Title>' +
'        <Abstract>Main Tasmania roads</Abstract>' +
'        <KeywordList>' +
'          <Keyword>Roads</Keyword>' +
'          <Keyword>Tasmania</Keyword>' +
'        </KeywordList>' +
'        <SRS>EPSG:4326</SRS>' +
'        <!--WKT definition of this CRS:' +
'GEOGCS["WGS 84", ' +
'  DATUM["World Geodetic System 1984", ' +
'    SPHEROID["WGS 84", 6378137.0, 298.257223563, AUTHORITY["EPSG","7030"]], ' +
'    AUTHORITY["EPSG","6326"]], ' +
'  PRIMEM["Greenwich", 0.0, AUTHORITY["EPSG","8901"]], ' +
'  UNIT["degree", 0.017453292519943295], ' +
'  AXIS["Geodetic longitude", EAST], ' +
'  AXIS["Geodetic latitude", NORTH], ' +
'  AUTHORITY["EPSG","4326"]]-->' +
'        <LatLonBoundingBox minx="145.1667856" miny="-43.706631400000006" maxx="148.30373440000002" maxy="-40.56968259999999"/>' +
'        <BoundingBox SRS="EPSG:4326" minx="145.19754" miny="-43.423512" maxx="148.27298000000002" maxy="-40.852802"/>' +
'        <Style>' +
'          <Name>simple_roads</Name>' +
'          <Title>Default Styler for simple road segments</Title>' +
'          <Abstract>Light red line, 2px wide</Abstract>' +
'          <LegendURL width="20" height="20">' +
'            <Format>image/png</Format>' +
'            <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://demo.boundlessgeo.com/geoserver/wms/GetLegendGraphic?VERSION=1.0.0&amp;FORMAT=image/png&amp;WIDTH=20&amp;HEIGHT=20&amp;LAYER=topp:tasmania_roads"/>' +
'          </LegendURL>' +
'        </Style>' +
'      </Layer>' +
'      <Layer queryable="1">' +
'        <Name>topp:tasmania_state_boundaries</Name>' +
'        <Title>Tasmania state boundaries</Title>' +
'        <Abstract>Tasmania state boundaries</Abstract>' +
'        <KeywordList>' +
'          <Keyword>boundaries</Keyword>' +
'          <Keyword>tasmania_state_boundaries</Keyword>' +
'          <Keyword>Tasmania</Keyword>' +
'        </KeywordList>' +
'        <SRS>EPSG:4326</SRS>' +
'        <!--WKT definition of this CRS:' +
'GEOGCS["WGS 84", ' +
'  DATUM["World Geodetic System 1984", ' +
'    SPHEROID["WGS 84", 6378137.0, 298.257223563, AUTHORITY["EPSG","7030"]], ' +
'    AUTHORITY["EPSG","6326"]], ' +
'  PRIMEM["Greenwich", 0.0, AUTHORITY["EPSG","8901"]], ' +
'  UNIT["degree", 0.017453292519943295], ' +
'  AXIS["Geodetic longitude", EAST], ' +
'  AXIS["Geodetic latitude", NORTH], ' +
'  AUTHORITY["EPSG","4326"]]-->' +
'        <LatLonBoundingBox minx="143.74100879660003" miny="-44.026947203400006" maxx="148.57295620340003" maxy="-39.194999796599994"/>' +
'        <BoundingBox SRS="EPSG:4326" minx="143.83482400000003" miny="-43.648056" maxx="148.47914100000003" maxy="-39.573891"/>' +
'        <Style>' +
'          <Name>green</Name>' +
'          <Title>Green polygon</Title>' +
'          <Abstract>Green fill with black outline</Abstract>' +
'          <LegendURL width="20" height="20">' +
'            <Format>image/png</Format>' +
'            <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://demo.boundlessgeo.com/geoserver/wms/GetLegendGraphic?VERSION=1.0.0&amp;FORMAT=image/png&amp;WIDTH=20&amp;HEIGHT=20&amp;LAYER=topp:tasmania_state_boundaries"/>' +
'          </LegendURL>' +
'        </Style>' +
'      </Layer>' +
'      <Layer queryable="1">' +
'        <Name>topp:tasmania_water_bodies</Name>' +
'        <Title>Tasmania water bodies</Title>' +
'        <Abstract>Tasmania water bodies</Abstract>' +
'        <KeywordList>' +
'          <Keyword>Lakes</Keyword>' +
'          <Keyword>Bodies</Keyword>' +
'          <Keyword>Australia</Keyword>' +
'          <Keyword>Water</Keyword>' +
'          <Keyword>Tasmania</Keyword>' +
'        </KeywordList>' +
'        <SRS>EPSG:4326</SRS>' +
'        <!--WKT definition of this CRS:' +
'GEOGCS["WGS 84", ' +
'  DATUM["World Geodetic System 1984", ' +
'    SPHEROID["WGS 84", 6378137.0, 298.257223563, AUTHORITY["EPSG","7030"]], ' +
'    AUTHORITY["EPSG","6326"]], ' +
'  PRIMEM["Greenwich", 0.0, AUTHORITY["EPSG","8901"]], ' +
'  UNIT["degree", 0.017453292519943295], ' +
'  AXIS["Geodetic longitude", EAST], ' +
'  AXIS["Geodetic latitude", NORTH], ' +
'  AUTHORITY["EPSG","4326"]]-->' +
'        <LatLonBoundingBox minx="145.95490063999998" miny="-43.04450786" maxx="147.23641436" maxy="-41.762994139999996"/>' +
'        <BoundingBox SRS="EPSG:4326" minx="145.97161899999998" miny="-43.031944" maxx="147.219696" maxy="-41.775558"/>' +
'        <Style>' +
'          <Name>cite_lakes</Name>' +
'          <Title>Blue lake</Title>' +
'          <Abstract>A blue fill, solid black outline style</Abstract>' +
'          <LegendURL width="20" height="20">' +
'            <Format>image/png</Format>' +
'            <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://demo.boundlessgeo.com/geoserver/wms/GetLegendGraphic?VERSION=1.0.0&amp;FORMAT=image/png&amp;WIDTH=20&amp;HEIGHT=20&amp;LAYER=topp:tasmania_water_bodies"/>' +
'          </LegendURL>' +
'        </Style>' +
'      </Layer>' +
'      <Layer queryable="1">' +
'        <Name>topp:states</Name>' +
'        <Title>USA Population</Title>' +
'        <Abstract>This is some census data on the states.</Abstract>' +
'        <KeywordList>' +
'          <Keyword>census</Keyword>' +
'          <Keyword>united</Keyword>' +
'          <Keyword>boundaries</Keyword>' +
'          <Keyword>state</Keyword>' +
'          <Keyword>states</Keyword>' +
'        </KeywordList>' +
'        <SRS>EPSG:4326</SRS>' +
'        <!--WKT definition of this CRS:' +
'GEOGCS["WGS 84", ' +
'  DATUM["World Geodetic System 1984", ' +
'    SPHEROID["WGS 84", 6378137.0, 298.257223563, AUTHORITY["EPSG","7030"]], ' +
'    AUTHORITY["EPSG","6326"]], ' +
'  PRIMEM["Greenwich", 0.0, AUTHORITY["EPSG","8901"]], ' +
'  UNIT["degree", 0.017453292519943295], ' +
'  AXIS["Geodetic longitude", EAST], ' +
'  AXIS["Geodetic latitude", NORTH], ' +
'  AUTHORITY["EPSG","4326"]]-->' +
'        <LatLonBoundingBox minx="-125.30903773" miny="7.705448770000002" maxx="-66.39223326999999" maxy="66.62225323"/>' +
'        <BoundingBox SRS="EPSG:4326" minx="-124.73142200000001" miny="24.955967" maxx="-66.969849" maxy="49.371735"/>' +
'        <Style>' +
'          <Name>population</Name>' +
'          <Title>Population in the United States</Title>' +
'          <Abstract>A sample filter that filters the United States into three' +
'        categories of population, drawn in different colors</Abstract>' +
'          <LegendURL width="20" height="20">' +
'            <Format>image/png</Format>' +
'            <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://demo.boundlessgeo.com/geoserver/wms/GetLegendGraphic?VERSION=1.0.0&amp;FORMAT=image/png&amp;WIDTH=20&amp;HEIGHT=20&amp;LAYER=topp:states"/>' +
'          </LegendURL>' +
'        </Style>' +
'      </Layer>' +
'      <Layer queryable="1">' +
'        <Name>tike:waterways</Name>' +
'        <Title>Waterways</Title>' +
'        <Abstract>Waterways in Finland.</Abstract>' +
'        <KeywordList>' +
'          <Keyword>Finland</Keyword>' +
'          <Keyword>waterways</Keyword>' +
'        </KeywordList>' +
'        <SRS>EPSG:4326</SRS>' +
'        <!--WKT definition of this CRS:' +
'GEOGCS["WGS 84", ' +
'  DATUM["World Geodetic System 1984", ' +
'    SPHEROID["WGS 84", 6378137.0, 298.257223563, AUTHORITY["EPSG","7030"]], ' +
'    AUTHORITY["EPSG","6326"]], ' +
'  PRIMEM["Greenwich", 0.0, AUTHORITY["EPSG","8901"]], ' +
'  UNIT["degree", 0.017453292519943295], ' +
'  AXIS["Geodetic longitude", EAST], ' +
'  AXIS["Geodetic latitude", NORTH], ' +
'  AUTHORITY["EPSG","4326"]]-->' +
'        <LatLonBoundingBox minx="19.530168895721403" miny="58.860618000030506" maxx="31.6566005897522" maxy="70.9870496940613"/>' +
'        <BoundingBox SRS="EPSG:4326" minx="19.649055480957" miny="59.9357719421387" maxx="31.5377140045166" maxy="69.9118957519531"/>' +
'        <Style>' +
'          <Name>line</Name>' +
'          <Title>1 px blue line</Title>' +
'          <Abstract>Default line style, 1 pixel wide blue</Abstract>' +
'          <LegendURL width="20" height="20">' +
'            <Format>image/png</Format>' +
'            <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://demo.boundlessgeo.com/geoserver/wms/GetLegendGraphic?VERSION=1.0.0&amp;FORMAT=image/png&amp;WIDTH=20&amp;HEIGHT=20&amp;LAYER=tike:waterways"/>' +
'          </LegendURL>' +
'        </Style>' +
'      </Layer>' +
'      <Layer queryable="1">' +
'        <Name>tike:railways</Name>' +
'        <Title>roads_Type</Title>' +
'        <Abstract>Generated from tike</Abstract>' +
'        <KeywordList>' +
'          <Keyword>tike</Keyword>' +
'          <Keyword>roads</Keyword>' +
'        </KeywordList>' +
'        <SRS>EPSG:4326</SRS>' +
'        <!--WKT definition of this CRS:' +
'GEOGCS["WGS 84", ' +
'  DATUM["World Geodetic System 1984", ' +
'    SPHEROID["WGS 84", 6378137.0, 298.257223563, AUTHORITY["EPSG","7030"]], ' +
'    AUTHORITY["EPSG","6326"]], ' +
'  PRIMEM["Greenwich", 0.0, AUTHORITY["EPSG","8901"]], ' +
'  UNIT["degree", 0.017453292519943295], ' +
'  AXIS["Geodetic longitude", EAST], ' +
'  AXIS["Geodetic latitude", NORTH], ' +
'  AUTHORITY["EPSG","4326"]]-->' +
'        <LatLonBoundingBox minx="-297176.16529836657" miny="-1.2694600326676274E7" maxx="3.0016785704606913E7" maxy="1.7619361543229006E7"/>' +
'        <BoundingBox SRS="EPSG:4326" minx="19.5393085479736" miny="-2277.78344726562" maxx="2.971959E7" maxy="4927039.0"/>' +
'        <Style>' +
'          <Name>line</Name>' +
'          <Title>1 px blue line</Title>' +
'          <Abstract>Default line style, 1 pixel wide blue</Abstract>' +
'          <LegendURL width="20" height="20">' +
'            <Format>image/png</Format>' +
'            <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://demo.boundlessgeo.com/geoserver/wms/GetLegendGraphic?VERSION=1.0.0&amp;FORMAT=image/png&amp;WIDTH=20&amp;HEIGHT=20&amp;LAYER=tike:railways"/>' +
'          </LegendURL>' +
'        </Style>' +
'      </Layer>' +
'      <Layer queryable="1">' +
'        <Name>tike:roads</Name>' +
'        <Title>roads_Type</Title>' +
'        <Abstract>Generated from tike</Abstract>' +
'        <KeywordList>' +
'          <Keyword>tike</Keyword>' +
'          <Keyword>roads</Keyword>' +
'        </KeywordList>' +
'        <SRS>EPSG:4326</SRS>' +
'        <!--WKT definition of this CRS:' +
'GEOGCS["WGS 84", ' +
'  DATUM["World Geodetic System 1984", ' +
'    SPHEROID["WGS 84", 6378137.0, 298.257223563, AUTHORITY["EPSG","7030"]], ' +
'    AUTHORITY["EPSG","6326"]], ' +
'  PRIMEM["Greenwich", 0.0, AUTHORITY["EPSG","8901"]], ' +
'  UNIT["degree", 0.017453292519943295], ' +
'  AXIS["Geodetic longitude", EAST], ' +
'  AXIS["Geodetic latitude", NORTH], ' +
'  AUTHORITY["EPSG","4326"]]-->' +
'        <LatLonBoundingBox minx="-297176.16529836657" miny="-1.2694600326676274E7" maxx="3.0016785704606913E7" maxy="1.7619361543229006E7"/>' +
'        <BoundingBox SRS="EPSG:4326" minx="19.5393085479736" miny="-2277.78344726562" maxx="2.971959E7" maxy="4927039.0"/>' +
'        <Style>' +
'          <Name>line</Name>' +
'          <Title>1 px blue line</Title>' +
'          <Abstract>Default line style, 1 pixel wide blue</Abstract>' +
'          <LegendURL width="20" height="20">' +
'            <Format>image/png</Format>' +
'            <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://demo.boundlessgeo.com/geoserver/wms/GetLegendGraphic?VERSION=1.0.0&amp;FORMAT=image/png&amp;WIDTH=20&amp;HEIGHT=20&amp;LAYER=tike:roads"/>' +
'          </LegendURL>' +
'        </Style>' +
'      </Layer>' +
'      <Layer queryable="1">' +
'        <Name>og:roads</Name>' +
'        <Title>roads_Type</Title>' +
'        <Abstract>Generated from sf_reset</Abstract>' +
'        <KeywordList>' +
'          <Keyword>roads</Keyword>' +
'          <Keyword>sf_reset</Keyword>' +
'        </KeywordList>' +
'        <SRS>EPSG:26713</SRS>' +
'        <!--WKT definition of this CRS:' +
'PROJCS["NAD27 / UTM zone 13N", ' +
'  GEOGCS["NAD27", ' +
'    DATUM["North American Datum 1927", ' +
'      SPHEROID["Clarke 1866", 6378206.4, 294.9786982138982, AUTHORITY["EPSG","7008"]], ' +
'      TOWGS84[-4.2, 135.4, 181.9, 0.0, 0.0, 0.0, 0.0], ' +
'      AUTHORITY["EPSG","6267"]], ' +
'    PRIMEM["Greenwich", 0.0, AUTHORITY["EPSG","8901"]], ' +
'    UNIT["degree", 0.017453292519943295], ' +
'    AXIS["Geodetic longitude", EAST], ' +
'    AXIS["Geodetic latitude", NORTH], ' +
'    AUTHORITY["EPSG","4267"]], ' +
'  PROJECTION["Transverse Mercator", AUTHORITY["EPSG","9807"]], ' +
'  PARAMETER["central_meridian", -105.0], ' +
'  PARAMETER["latitude_of_origin", 0.0], ' +
'  PARAMETER["scale_factor", 0.9996], ' +
'  PARAMETER["false_easting", 500000.0], ' +
'  PARAMETER["false_northing", 0.0], ' +
'  UNIT["m", 1.0], ' +
'  AXIS["Easting", EAST], ' +
'  AXIS["Northing", NORTH], ' +
'  AUTHORITY["EPSG","26713"]]-->' +
'        <LatLonBoundingBox minx="-103.88042792817339" miny="44.308776913708805" maxx="-103.62014761945467" maxy="44.56905722242751"/>' +
'        <BoundingBox SRS="EPSG:26713" minx="589434.8125" miny="4914006.0" maxx="609527.25" maxy="4928377.0"/>' +
'        <Style>' +
'          <Name>simple_roads</Name>' +
'          <Title>Default Styler for simple road segments</Title>' +
'          <Abstract>Light red line, 2px wide</Abstract>' +
'          <LegendURL width="20" height="20">' +
'            <Format>image/png</Format>' +
'            <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://demo.boundlessgeo.com/geoserver/wms/GetLegendGraphic?VERSION=1.0.0&amp;FORMAT=image/png&amp;WIDTH=20&amp;HEIGHT=20&amp;LAYER=og:roads"/>' +
'          </LegendURL>' +
'        </Style>' +
'      </Layer>' +
'      <Layer queryable="1">' +
'        <Name>tike:points</Name>' +
'        <Title>roads_Type</Title>' +
'        <Abstract>Generated from tike</Abstract>' +
'        <KeywordList>' +
'          <Keyword>tike</Keyword>' +
'          <Keyword>roads</Keyword>' +
'        </KeywordList>' +
'        <SRS>EPSG:4326</SRS>' +
'        <!--WKT definition of this CRS:' +
'GEOGCS["WGS 84", ' +
'  DATUM["World Geodetic System 1984", ' +
'    SPHEROID["WGS 84", 6378137.0, 298.257223563, AUTHORITY["EPSG","7030"]], ' +
'    AUTHORITY["EPSG","6326"]], ' +
'  PRIMEM["Greenwich", 0.0, AUTHORITY["EPSG","8901"]], ' +
'  UNIT["degree", 0.017453292519943295], ' +
'  AXIS["Geodetic longitude", EAST], ' +
'  AXIS["Geodetic latitude", NORTH], ' +
'  AUTHORITY["EPSG","4326"]]-->' +
'        <LatLonBoundingBox minx="19.73377216339108" miny="59.107116584777835" maxx="31.40053188323972" maxy="70.77387630462647"/>' +
'        <BoundingBox SRS="EPSG:4326" minx="19.8481521606445" miny="59.8213005065918" maxx="31.2861518859863" maxy="70.0596923828125"/>' +
'        <Style>' +
'          <Name>line</Name>' +
'          <Title>1 px blue line</Title>' +
'          <Abstract>Default line style, 1 pixel wide blue</Abstract>' +
'          <LegendURL width="20" height="20">' +
'            <Format>image/png</Format>' +
'            <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://demo.boundlessgeo.com/geoserver/wms/GetLegendGraphic?VERSION=1.0.0&amp;FORMAT=image/png&amp;WIDTH=20&amp;HEIGHT=20&amp;LAYER=tike:points"/>' +
'          </LegendURL>' +
'        </Style>' +
'      </Layer>' +
'      <Layer queryable="1">' +
'        <Name>topp:bluemarble</Name>' +
'        <Title>Blue Marble Imagery</Title>' +
'        <Abstract>Blue Marble NG global bathymetry and topography data from NASA.  More information about the Blue Marble NG project is available from http://earthobservatory.nasa.gov/Features/BlueMarble .</Abstract>' +
'        <KeywordList>' +
'          <Keyword>WCS</Keyword>' +
'          <Keyword>bluemarble</Keyword>' +
'          <Keyword>bluemarble</Keyword>' +
'        </KeywordList>' +
'        <!--WKT definition of this CRS:' +
'GEOGCS["WGS 84", ' +
'  DATUM["World Geodetic System 1984", ' +
'    SPHEROID["WGS 84", 6378137.0, 298.257223563, AUTHORITY["EPSG","7030"]], ' +
'    AUTHORITY["EPSG","6326"]], ' +
'  PRIMEM["Greenwich", 0.0, AUTHORITY["EPSG","8901"]], ' +
'  UNIT["degree", 0.017453292519943295], ' +
'  AXIS["Geodetic longitude", EAST], ' +
'  AXIS["Geodetic latitude", NORTH], ' +
'  AUTHORITY["EPSG","4326"]]-->' +
'        <SRS>EPSG:4326</SRS>' +
'        <LatLonBoundingBox minx="-180.00000003333" miny="-89.99999996486703" maxx="179.99999993067" maxy="90.000000033333"/>' +
'        <BoundingBox SRS="EPSG:4326" minx="-180.00000003333" miny="-89.99999996486703" maxx="179.99999993067" maxy="90.000000033333"/>' +
'        <Style>' +
'          <Name>raster</Name>' +
'          <Title>Raster</Title>' +
'          <Abstract>A sample style for rasters, good for displaying imagery</Abstract>' +
'          <LegendURL width="20" height="20">' +
'            <Format>image/png</Format>' +
'            <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://demo.boundlessgeo.com/geoserver/wms/GetLegendGraphic?VERSION=1.0.0&amp;FORMAT=image/png&amp;WIDTH=20&amp;HEIGHT=20&amp;LAYER=topp:bluemarble"/>' +
'          </LegendURL>' +
'        </Style>' +
'      </Layer>' +
'      <Layer queryable="1">' +
'        <Name>nurc:Arc_Sample</Name>' +
'        <Title>Global annual rainfall</Title>' +
'        <Abstract>Global annual rainfall in ArcGrid format</Abstract>' +
'        <KeywordList>' +
'          <Keyword>WCS</Keyword>' +
'          <Keyword>arcGridSample</Keyword>' +
'          <Keyword>arcGridSample_Coverage</Keyword>' +
'        </KeywordList>' +
'        <!--WKT definition of this CRS:' +
'GEOGCS["WGS 84", ' +
'  DATUM["World Geodetic System 1984", ' +
'    SPHEROID["WGS 84", 6378137.0, 298.257223563, AUTHORITY["EPSG","7030"]], ' +
'    AUTHORITY["EPSG","6326"]], ' +
'  PRIMEM["Greenwich", 0.0, AUTHORITY["EPSG","8901"]], ' +
'  UNIT["degree", 0.017453292519943295], ' +
'  AXIS["Geodetic longitude", EAST], ' +
'  AXIS["Geodetic latitude", NORTH], ' +
'  AUTHORITY["EPSG","4326"]]-->' +
'        <SRS>EPSG:4326</SRS>' +
'        <LatLonBoundingBox minx="-180.0" miny="-90.0" maxx="180.0" maxy="90.0"/>' +
'        <BoundingBox SRS="EPSG:4326" minx="-180.0" miny="-90.0" maxx="180.0" maxy="90.0"/>' +
'        <Style>' +
'          <Name>raster</Name>' +
'          <Title>Raster</Title>' +
'          <Abstract>A sample style for rasters, good for displaying imagery</Abstract>' +
'          <LegendURL width="20" height="20">' +
'            <Format>image/png</Format>' +
'            <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://demo.boundlessgeo.com/geoserver/wms/GetLegendGraphic?VERSION=1.0.0&amp;FORMAT=image/png&amp;WIDTH=20&amp;HEIGHT=20&amp;LAYER=nurc:Arc_Sample"/>' +
'          </LegendURL>' +
'        </Style>' +
'      </Layer>' +
'      <Layer queryable="1">' +
'        <Name>nurc:Img_Sample</Name>' +
'        <Title>North America sample imagery</Title>' +
'        <Abstract>A very rough imagery of North America</Abstract>' +
'        <KeywordList>' +
'          <Keyword>WCS</Keyword>' +
'          <Keyword>worldImageSample</Keyword>' +
'          <Keyword>worldImageSample_Coverage</Keyword>' +
'        </KeywordList>' +
'        <!--WKT definition of this CRS:' +
'GEOGCS["WGS 84", ' +
'  DATUM["World Geodetic System 1984", ' +
'    SPHEROID["WGS 84", 6378137.0, 298.257223563, AUTHORITY["EPSG","7030"]], ' +
'    AUTHORITY["EPSG","6326"]], ' +
'  PRIMEM["Greenwich", 0.0, AUTHORITY["EPSG","8901"]], ' +
'  UNIT["degree", 0.017453292519943295], ' +
'  AXIS["Geodetic longitude", EAST], ' +
'  AXIS["Geodetic latitude", NORTH], ' +
'  AUTHORITY["EPSG","4326"]]-->' +
'        <SRS>EPSG:4326</SRS>' +
'        <LatLonBoundingBox minx="-130.85168" miny="20.7052" maxx="-62.0054" maxy="54.1141"/>' +
'        <BoundingBox SRS="EPSG:4326" minx="-130.85168" miny="20.7052" maxx="-62.0054" maxy="54.1141"/>' +
'        <Style>' +
'          <Name>raster</Name>' +
'          <Title>Raster</Title>' +
'          <Abstract>A sample style for rasters, good for displaying imagery</Abstract>' +
'          <LegendURL width="20" height="20">' +
'            <Format>image/png</Format>' +
'            <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://demo.boundlessgeo.com/geoserver/wms/GetLegendGraphic?VERSION=1.0.0&amp;FORMAT=image/png&amp;WIDTH=20&amp;HEIGHT=20&amp;LAYER=nurc:Img_Sample"/>' +
'          </LegendURL>' +
'        </Style>' +
'      </Layer>' +
'      <Layer queryable="1">' +
'        <Name>sf:sfdem</Name>' +
'        <Title>Spearfish DEM</Title>' +
'        <Abstract>Digital Elevation Model data for Spearfish, South Dakota</Abstract>' +
'        <KeywordList>' +
'          <Keyword>WCS</Keyword>' +
'          <Keyword>sf</Keyword>' +
'          <Keyword>dem</Keyword>' +
'          <Keyword>digital</Keyword>' +
'          <Keyword>elevation</Keyword>' +
'          <Keyword>model</Keyword>' +
'        </KeywordList>' +
'        <!--WKT definition of this CRS:' +
'PROJCS["NAD27 / UTM zone 13N", ' +
'  GEOGCS["NAD27", ' +
'    DATUM["North American Datum 1927", ' +
'      SPHEROID["Clarke 1866", 6378206.4, 294.9786982138982, AUTHORITY["EPSG","7008"]], ' +
'      TOWGS84[-4.2, 135.4, 181.9, 0.0, 0.0, 0.0, 0.0], ' +
'      AUTHORITY["EPSG","6267"]], ' +
'    PRIMEM["Greenwich", 0.0, AUTHORITY["EPSG","8901"]], ' +
'    UNIT["degree", 0.017453292519943295], ' +
'    AXIS["Geodetic longitude", EAST], ' +
'    AXIS["Geodetic latitude", NORTH], ' +
'    AUTHORITY["EPSG","4267"]], ' +
'  PROJECTION["Transverse Mercator", AUTHORITY["EPSG","9807"]], ' +
'  PARAMETER["central_meridian", -105.0], ' +
'  PARAMETER["latitude_of_origin", 0.0], ' +
'  PARAMETER["scale_factor", 0.9996], ' +
'  PARAMETER["false_easting", 500000.0], ' +
'  PARAMETER["false_northing", 0.0], ' +
'  UNIT["m", 1.0], ' +
'  AXIS["Easting", EAST], ' +
'  AXIS["Northing", NORTH], ' +
'  AUTHORITY["EPSG","26713"]]-->' +
'        <SRS>EPSG:26713</SRS>' +
'        <LatLonBoundingBox minx="-103.87108701853181" miny="44.370187074132616" maxx="-103.62940739432703" maxy="44.5016011535299"/>' +
'        <BoundingBox SRS="EPSG:26713" minx="589980.0" miny="4913700.0" maxx="609000.0" maxy="4928010.0"/>' +
'        <Style>' +
'          <Name>dem</Name>' +
'          <Title>Simple DEM style</Title>' +
'          <Abstract>Classic elevation color progression</Abstract>' +
'          <LegendURL width="20" height="20">' +
'            <Format>image/png</Format>' +
'            <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="http://demo.boundlessgeo.com/geoserver/wms/GetLegendGraphic?VERSION=1.0.0&amp;FORMAT=image/png&amp;WIDTH=20&amp;HEIGHT=20&amp;LAYER=sf:sfdem"/>' +
'          </LegendURL>' +
'        </Style>' +
'      </Layer>' +
'      <Layer queryable="0">' +
'        <Name>tasmania</Name>' +
'        <Title>tasmania</Title>' +
'        <Abstract>Layer-Group type layer: tasmania</Abstract>' +
'        <SRS>EPSG:4326</SRS>' +
'        <LatLonBoundingBox minx="143.83482400000003" miny="-43.648056" maxx="148.47914100000003" maxy="-39.573891"/>' +
'        <BoundingBox SRS="EPSG:4326" minx="143.83482400000003" miny="-43.648056" maxx="148.47914100000003" maxy="-39.573891"/>' +
'      </Layer>' +
'      <Layer queryable="0">' +
'        <Name>tiger-ny</Name>' +
'        <Title>tiger-ny</Title>' +
'        <Abstract>Layer-Group type layer: tiger-ny</Abstract>' +
'        <SRS>EPSG:4326</SRS>' +
'        <LatLonBoundingBox minx="-74.047185" miny="40.679648" maxx="-73.907005" maxy="40.882078"/>' +
'        <BoundingBox SRS="EPSG:4326" minx="-74.047185" miny="40.679648" maxx="-73.907005" maxy="40.882078"/>' +
'      </Layer>' +
'    </Layer>' +
'  </Capability>' +
'</WMT_MS_Capabilities>';

