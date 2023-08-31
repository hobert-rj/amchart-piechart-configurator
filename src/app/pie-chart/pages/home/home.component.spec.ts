import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HomeComponent} from './home.component';
import {RouterTestingModule} from '@angular/router/testing';
import {FooterComponent} from '../../lib/component/footer/footer.component';
import {HeaderComponent} from '../../lib/component/header/header.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, RouterTestingModule, HeaderComponent, FooterComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
