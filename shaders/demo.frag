		varying vec2 vUv;
		uniform float time;
		void main()	{
			vec2 p = - 1.0 + 2.0 * vUv;
			p=p*2.0;
			float zoo = .62+.38*sin(.1*time);
			float coa = cos( 0.1*(1.0-zoo)*time );
			float sia = sin( 0.1*(1.0-zoo)*time );
			zoo = pow( zoo,8.0);
			vec2 xy = vec2( p.x*coa-p.y*sia, p.x*sia+p.y*coa);
			vec2 cc = vec2(-.745,.186) + xy*zoo;
			vec2 z  = vec2(0.0);
			vec2 z2 = z*z;
			float m2;
			float co = 0.0;
			for( int i=0; i<256; i++ ){
				z = cc + vec2( z.x*z.x - z.y*z.y, 2.0*z.x*z.y );
				m2 = dot(z,z);
				if( m2>1024.0 ) break;
				co += 1.0;
			}
			co = co + 1.0 - log2(.5*log2(m2));

			co = sqrt(co/256.0);
			gl_FragColor = vec4( .5+.5*cos(6.2831*co+0.0),
								.5+.5*cos(6.2831*co+0.4),
								.5+.5*cos(6.2831*co+0.7),
								1.0 );
		}
